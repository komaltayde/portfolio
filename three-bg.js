/* 
================================================================
   KOMAL TAYADE - FUTURISTIC 3D PORTFOLIO (WEBGL BACKGROUND)
================================================================
*/

// Global variables for main background
let bgScene, bgCamera, bgRenderer;
let particleSystem, particleGeometry;
let connectionLines;
let floatingGeometries = [];
const particleCount = 120;
const connectionDistance = 110;
let particlesData = [];
let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
const mouseRadius = 150;

// Global variables for Skills Sphere
let skillsScene, skillsCamera, skillsRenderer, skillsControls;
let skillSphereGroup;

// Initialize both canvas elements when the DOM loads
window.addEventListener('DOMContentLoaded', () => {
    initBackground3D();
    initSkillsSphere();
    animate();
});

// ==========================================
// 1. MAIN BACKGROUND: NEURAL NETWORK & SHAPES
// ==========================================
function initBackground3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Create Scene
    bgScene = new THREE.Scene();
    bgScene.fog = new THREE.FogExp2(0x05050a, 0.0015);

    // Create Camera
    bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    bgCamera.position.z = 400;

    // Create Renderer
    bgRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    bgRenderer.setPixelRatio(window.devicePixelRatio);
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setClearColor(0x05050a, 0); // Transparent background to let CSS gradients show
    container.appendChild(bgRenderer.domElement);

    // 1A. Particle Network Setup
    particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPurple = new THREE.Color(0x8a2be2);
    const colorCyan = new THREE.Color(0x00f2fe);

    for (let i = 0; i < particleCount; i++) {
        // Distribute particles in a 3D box
        const x = Math.random() * 800 - 400;
        const y = Math.random() * 800 - 400;
        const z = Math.random() * 800 - 400;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Save original position & velocity details
        particlesData.push({
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.6,
                (Math.random() - 0.5) * 0.6,
                (Math.random() - 0.5) * 0.3
            ),
            originalX: x,
            originalY: y,
            originalZ: z,
            glowProgress: Math.random() * Math.PI
        });

        // Set color mix (cyan to purple)
        const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom particle texture using simple canvas drawing
    const pTexture = createParticleTexture();
    const pMaterial = new THREE.PointsMaterial({
        size: 5,
        map: pTexture,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particleSystem = new THREE.Points(particleGeometry, pMaterial);
    bgScene.add(particleSystem);

    // 1B. Connection Lines Setup
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x8a2be2,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });

    const lineGeometry = new THREE.BufferGeometry();
    // Maximum lines possible = N * (N - 1) / 2. We allocate a buffer for lines.
    const maxLineSegments = 1000;
    const linePositions = new Float32Array(maxLineSegments * 2 * 3);
    const lineColors = new Float32Array(maxLineSegments * 2 * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    bgScene.add(connectionLines);

    // 1C. Floating 3D Geometric Accents
    createFloatingGeometries();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScrollParallax);
}

// Generate simple glowing dot texture
function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(0, 242, 254, 0.8)');
    grad.addColorStop(0.5, 'rgba(138, 43, 226, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function createFloatingGeometries() {
    const matPurple = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    const matCyan = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });

    // 1. Torus
    const torusGeom = new THREE.TorusGeometry(80, 25, 8, 24);
    const torus = new THREE.Mesh(torusGeom, matPurple);
    torus.position.set(-250, 100, -100);
    bgScene.add(torus);
    floatingGeometries.push({ mesh: torus, rx: 0.002, ry: 0.003, rz: 0.001, scrollFactor: 0.15 });

    // 2. Octahedron
    const octGeom = new THREE.OctahedronGeometry(60, 1);
    const oct = new THREE.Mesh(octGeom, matCyan);
    oct.position.set(250, -150, -50);
    bgScene.add(oct);
    floatingGeometries.push({ mesh: oct, rx: 0.004, ry: 0.002, rz: 0.003, scrollFactor: -0.15 });

    // 3. Icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(70, 0);
    const ico = new THREE.Mesh(icoGeom, matPurple);
    ico.position.set(-150, -300, -200);
    bgScene.add(ico);
    floatingGeometries.push({ mesh: ico, rx: 0.001, ry: 0.004, rz: 0.002, scrollFactor: 0.1 });
}

// Mouse events
function onMouseMove(event) {
    // Map mouse position to WebGL normalized device coordinates (-1 to 1)
    mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Window resize
function onWindowResize() {
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);

    // If skills element is active, resize it too
    if (skillsRenderer) {
        const skillsContainer = document.getElementById('skills-canvas').parentElement;
        const width = skillsContainer.clientWidth;
        const height = skillsContainer.clientHeight;
        skillsCamera.aspect = width / height;
        skillsCamera.updateProjectionMatrix();
        skillsRenderer.setSize(width, height);
    }
}

// Parallax scrolling
function onScrollParallax() {
    const scrollY = window.scrollY;
    
    // Shift camera slightly based on scroll
    bgCamera.position.y = -scrollY * 0.15 + 400;

    // Shift floating shapes relative to scroll
    floatingGeometries.forEach(item => {
        item.mesh.position.y = (scrollY * item.scrollFactor) + (item.mesh.position.y * 0.01); // smooth offset
    });
}


// ==========================================
// 2. SKILLS INTERACTIVE SPHERE (SECONDARY CANVAS)
// ==========================================
function initSkillsSphere() {
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;

    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight || 350;

    // Scene
    skillsScene = new THREE.Scene();

    // Camera
    skillsCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    skillsCamera.position.z = 250;

    // Renderer
    skillsRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    skillsRenderer.setSize(width, height);
    skillsRenderer.setPixelRatio(window.devicePixelRatio);

    // Group for rotation
    skillSphereGroup = new THREE.Group();
    skillsScene.add(skillSphereGroup);

    // 2A. Holographic Core Sphere
    const sphereGeom = new THREE.SphereGeometry(60, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    const coreSphere = new THREE.Mesh(sphereGeom, sphereMat);
    skillSphereGroup.add(coreSphere);

    // 2B. Orbital Rings
    const ringMat = new THREE.LineBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.3
    });

    const createOrbitRing = (radius, rx, ry) => {
        const ringGeom = new THREE.BufferGeometry();
        const points = [];
        for (let i = 0; i <= 64; i++) {
            const theta = (i / 64) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
        }
        ringGeom.setFromPoints(points);
        const ring = new THREE.Line(ringGeom, ringMat);
        ring.rotation.x = rx;
        ring.rotation.y = ry;
        skillSphereGroup.add(ring);
    };

    createOrbitRing(80, 0.5, 0.2);
    createOrbitRing(95, -0.6, 0.6);
    createOrbitRing(110, 1.2, -0.4);

    // 2C. Interactive Skill Nodes (Satellites)
    const skillsList = [
        { name: "Java", color: 0xf89820, size: 8 },
        { name: "DSA", color: 0x00f2fe, size: 9 },
        { name: "MySQL", color: 0x00758f, size: 7 },
        { name: "React.js", color: 0x61dafb, size: 8 },
        { name: "JavaScript", color: 0xf7df1e, size: 7 },
        { name: "HTML5/CSS3", color: 0xe34f26, size: 6 },
        { name: "AI/ML", color: 0xa855f7, size: 10 },
        { name: "Git", color: 0xf05032, size: 6 }
    ];

    const nodesData = [];

    skillsList.forEach((skill, index) => {
        // Distribute nodes evenly on a sphere using Fibonacci lattice
        const phi = Math.acos(-1 + (2 * index) / skillsList.length);
        const theta = Math.sqrt(skillsList.length * Math.PI) * phi;

        const radius = 75 + Math.random() * 15;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        // Node Geometry (glowing octahedron)
        const nodeGeom = new THREE.OctahedronGeometry(skill.size / 2 + 1, 0);
        const nodeMat = new THREE.MeshBasicMaterial({
            color: skill.color,
            wireframe: false,
            transparent: true,
            opacity: 0.8
        });
        const mesh = new THREE.Mesh(nodeGeom, nodeMat);
        mesh.position.set(x, y, z);
        skillSphereGroup.add(mesh);

        // Subtle glowing wireframe cage for each node
        const cageGeom = new THREE.BoxGeometry(skill.size + 2, skill.size + 2, skill.size + 2);
        const cageMat = new THREE.MeshBasicMaterial({
            color: skill.color,
            wireframe: true,
            transparent: true,
            opacity: 0.25
        });
        const cage = new THREE.Mesh(cageGeom, cageMat);
        cage.position.set(x, y, z);
        skillSphereGroup.add(cage);

        nodesData.push({
            mesh: mesh,
            cage: cage,
            speed: 0.005 + Math.random() * 0.005,
            axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
            angle: Math.random() * Math.PI * 2
        });
    });

    // Simple drag-to-rotate interaction using OrbitControls
    skillsControls = new THREE.OrbitControls(skillsCamera, skillsRenderer.domElement);
    skillsControls.enableDamping = true;
    skillsControls.dampingFactor = 0.05;
    skillsControls.enableZoom = false;
    skillsControls.autoRotate = true;
    skillsControls.autoRotateSpeed = 0.5;
}


// ==========================================
// 3. ANIMATION LOOP
// ==========================================
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // 3A. Update Main Background
    if (bgScene) {
        // Smoothly interpolate mouse movement
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Slowly rotate background particle system
        particleSystem.rotation.y = time * 0.015;
        particleSystem.rotation.x = time * 0.008;

        // Retrieve particle coordinates
        const positions = particleGeometry.attributes.position.array;
        
        let vertexIndex = 0;
        let lineVertexIndex = 0;
        const linePositions = connectionLines.geometry.attributes.position.array;
        const lineColors = connectionLines.geometry.attributes.position.array; // Share array size
        let numConnected = 0;

        for (let i = 0; i < particleCount; i++) {
            const data = particlesData[i];
            
            // Drift positions
            let x = positions[i * 3] + data.velocity.x;
            let y = positions[i * 3 + 1] + data.velocity.y;
            let z = positions[i * 3 + 2] + data.velocity.z;

            // Boundary wrapping
            const bound = 400;
            if (x < -bound) x = bound;
            if (x > bound) x = -bound;
            if (y < -bound) y = bound;
            if (y > bound) y = -bound;
            if (z < -bound) z = bound;
            if (z > bound) z = -bound;

            // Interactive mouse warping (push particles slightly)
            // Transform screen mouse coordinates to 3D world space approximation
            const mouse3D = new THREE.Vector3(mouse.x * 280, mouse.y * 220, 0);
            const pPos = new THREE.Vector3(x, y, z);
            const distToMouse = pPos.distanceTo(mouse3D);

            if (distToMouse < mouseRadius) {
                // Deflection vector away from mouse
                const force = (mouseRadius - distToMouse) / mouseRadius;
                const dir = pPos.clone().sub(mouse3D).normalize();
                
                // Slowly push particles away
                x += dir.x * force * 15.0;
                y += dir.y * force * 15.0;
            }

            // Write back updated coordinates
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Connect lines logic (nested loop)
            for (let j = i + 1; j < particleCount; j++) {
                const ox = positions[j * 3];
                const oy = positions[j * 3 + 1];
                const oz = positions[j * 3 + 2];

                const dx = x - ox;
                const dy = y - oy;
                const dz = z - oz;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if (dist < connectionDistance && numConnected < 1000) {
                    // Node indices
                    const lineIdx = numConnected * 6;

                    // Point 1
                    linePositions[lineIdx] = x;
                    linePositions[lineIdx + 1] = y;
                    linePositions[lineIdx + 2] = z;

                    // Point 2
                    linePositions[lineIdx + 3] = ox;
                    linePositions[lineIdx + 4] = oy;
                    linePositions[lineIdx + 5] = oz;

                    numConnected++;
                }
            }
        }

        // Notify WebGL that coordinates changed
        particleGeometry.attributes.position.needsUpdate = true;
        connectionLines.geometry.attributes.position.needsUpdate = true;

        // Hide unused line segments in buffer by drawing them outside view
        const positionsLen = connectionLines.geometry.attributes.position.array.length;
        for (let idx = numConnected * 6; idx < positionsLen; idx++) {
            connectionLines.geometry.attributes.position.array[idx] = 9999;
        }
        connectionLines.geometry.attributes.position.needsUpdate = true;

        // Rotate floating geometries
        floatingGeometries.forEach(item => {
            item.mesh.rotation.x += item.rx;
            item.mesh.rotation.y += item.ry;
            item.mesh.rotation.z += item.rz;
        });

        // Render Background
        bgRenderer.render(bgScene, bgCamera);
    }

    // 3B. Update Skills Sphere
    if (skillsScene) {
        // Slow constant rotations
        skillSphereGroup.rotation.y += 0.003;
        skillSphereGroup.rotation.x += 0.001;

        // Update OrbitControls
        skillsControls.update();

        // Render Skills Canvas
        skillsRenderer.render(skillsScene, skillsCamera);
    }
}
