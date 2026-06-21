/* 
================================================================
   KOMAL TAYADE - FUTURISTIC 3D PORTFOLIO (INTERACTION & GSAP)
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTypingEffect();
    initMobileNav();
    initHeaderScroll();
    initContactForm();
    initGSAPScrollAnimations();
});

// ==========================================
// 1. CYBERNETIC PROGRESS LOADER
// ==========================================
function initPreloader() {
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('loader-progress');
    const loaderText = document.getElementById('loader-text');
    
    if (!loader || !progressBar || !loaderText) return;

    let progress = 0;
    const bootSequence = [
        { threshold: 0, msg: "BOOTING SYSTEM INTERFACE..." },
        { threshold: 12, msg: "MOUNTING CORE ENGINE COMPONENTS..." },
        { threshold: 28, msg: "INITIALIZING WEBGL 3D RENDER CANVAS..." },
        { threshold: 45, msg: "PARSING DATA STRUCTURE & COMPLEXITY MATRICES..." },
        { threshold: 60, msg: "CONNECTING AI / MACHINE LEARNING PIPELINES..." },
        { threshold: 78, msg: "RENDERING NEURAL NET CONSTELLATIONS..." },
        { threshold: 92, msg: "ESTABLISHING GLOW CODES & LIGHT GRIDS..." },
        { threshold: 100, msg: "SYSTEM OPTIMIZED. ACCESS GRANTED." }
    ];

    const updateLoader = setInterval(() => {
        // Generate random incremental steps
        progress += Math.floor(Math.random() * 8) + 3;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(updateLoader);
            
            // Finish loader
            progressBar.style.width = '100%';
            loaderText.innerText = bootSequence[bootSequence.length - 1].msg;
            
            setTimeout(() => {
                // Fade out loader
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                
                // Trigger GSAP Hero Reveal
                triggerHeroReveal();
            }, 800);
        } else {
            progressBar.style.width = progress + '%';
            
            // Find current phase message
            for (let i = 0; i < bootSequence.length; i++) {
                if (progress >= bootSequence[i].threshold) {
                    loaderText.innerText = `[${progress}%] ${bootSequence[i].msg}`;
                }
            }
        }
    }, 90);
}

// ==========================================
// 2. HERO REVEAL ANIMATIONS (GSAP)
// ==========================================
function triggerHeroReveal() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline();

    tl.fromTo('header', 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    tl.fromTo('.hero-tag', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.6"
    );

    tl.fromTo('.hero-content h1', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
    );

    tl.fromTo('.hero-subtitle', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.6 },
        "-=0.4"
    );

    tl.fromTo('.hero-content p', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
    );

    tl.fromTo('.hero-actions .btn', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
    );

    tl.fromTo('.avatar-card', 
        { scale: 0.85, rotationY: 45, opacity: 0 }, 
        { scale: 1, rotationY: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.2"
    );
}

// ==========================================
// 3. SUBHEADLINE TYPING EFFECT
// ==========================================
function initTypingEffect() {
    const typedTextSpan = document.getElementById("typed-text");
    if (!typedTextSpan) return;

    const textArray = [
        "Software Engineer 🚀",
        "Java Developer ☕",
        "AI Enthusiast 🧠",
        "React Developer ⚛️",
        "DSA Problem Solver 💻"
    ];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 2000; // Delay between typing new words
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Start typewriter loop after page loads
    setTimeout(type, 1500);
}

// ==========================================
// 4. HEADER ACTIONS & MOBILE MENU
// ==========================================
function initMobileNav() {
    const menuBtn = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when navigation link is clicked (useful on mobile)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================
// 5. GSAP SCROLLTRIGGER REVEALS
// ==========================================
function initGSAPScrollAnimations() {
    // If GSAP ScrollTrigger is not present, skip
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // 1. Generic Section Header Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // 2. About details card staggered entry
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: "top 75%"
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: "top 75%"
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)"
    });

    // 3. Skill Cards Staggered Reveal
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: "top 85%"
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out"
    });

    // 4. Project Cards Staggered Reveal
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out"
    });

    // 5. Timeline Nodes entry animations
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const side = index % 2 === 0 ? -60 : 60;
        gsap.from(item.querySelector('.timeline-content'), {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            x: side,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
        
        gsap.from(item.querySelector('.timeline-dot'), {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)"
        });
    });

    // 6. Bento Grid Items Stagger
    gsap.from('.bento-item', {
        scrollTrigger: {
            trigger: '.bento-grid',
            start: "top 80%"
        },
        scale: 0.92,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // 7. Contact Layout entry
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: "top 80%"
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    gsap.from('#portfolio-contact-form', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: "top 80%"
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// 6. ELEGANT CONTACT FORM SUBMISSION
// ==========================================
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const statusMsg = document.getElementById('form-status-msg');
    
    if (!form || !statusMsg) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Visual loading state
        statusMsg.className = 'form-status';
        statusMsg.style.display = 'block';
        statusMsg.innerText = '[TRANSMITTING ENCRYPTED COMMUNICATIONS...]';
        statusMsg.style.color = 'var(--accent-cyan)';

        // Simulate secure API dispatch delay
        setTimeout(() => {
            const name = document.getElementById('form-name').value;
            
            statusMsg.className = 'form-status success';
            statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> TRANSMISSION SUCCESSFUL.<br>Thank you ${name}, your secure message has been dispatched to Komal Tayade's terminal.`;
            
            // Clear input fields
            form.reset();
        }, 1500);
    });
}
