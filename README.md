# Komal Tayade - Premium Futuristic 3D Portfolio Website

A futuristic, high-performance personal portfolio website designed for **Komal Tayade**, featuring custom WebGL animations, an interactive 3D skills sphere, dynamic typing subtitles, glassmorphic cards, neon glows, and GSAP scroll transitions.

## 🚀 Features
1. **Interactive 3D Particles**: A full-screen constellation network that drifts in 3D and warps/attracts slightly in response to mouse cursor hover.
2. **Holographic Skills Sphere**: Drag-and-rotate 3D WebGL hypersphere displaying critical tech stack elements (Java, DSA, MySQL, React, AI/ML, Git) with orbital tracks.
3. **Cybernetic Preloader**: Premium startup sequence terminal displaying boot statistics and loading sequences.
4. **Fluid GSAP Reveals**: Clean, hardware-accelerated slide and fade triggers as you scroll down the page.
5. **Robust Fallbacks**: High-quality Unsplash CDN visuals act as fallbacks if local assets are missing.

---

## 📂 File Structure
```
/ (Workspace Root)
├── index.html          # Semantic HTML markup, metadata, SEO & CDN links
├── style.css           # Styling system (vars, glassmorphism, neon shadows, layout)
├── three-bg.js         # Three.js system setup, particle connections, 3D skills sphere
├── main.js             # GSAP timeline triggers, preloader logs, typewriter, form validation
└── assets/             # Project graphics (Avatar, mockups)
```

---

## 🎨 Asset Synchronization
During the design process, 4 unique premium 3D graphics were generated as system artifacts. To display these custom designs locally:

1. Create a folder named `assets` in this project directory (if not already present).
2. Copy the following files from your local AppData artifact cache directory (`C:\Users\komal\.gemini\antigravity\brain\94ad3582-3882-466f-9f54-96be8b5dbb87\`) to your workspace `assets/` folder, renaming them as follows:
   - `avatar_1782047946547.png` ➔ Rename to `assets/avatar.png`
   - `project_ai_1782047960738.png` ➔ Rename to `assets/project-ai.png`
   - `project_fs_1782047975309.png` ➔ Rename to `assets/project-fs.png`
   - `project_ds_1782047993201.png` ➔ Rename to `assets/project-ds.png`

*Note: If these files are not copied, the website has built-in smart fail-safes that fetch gorgeous, professional high-resolution software developer imagery directly from Unsplash, meaning the portfolio will look beautiful right out of the box!*

---

## 🖥️ How to Run
### Option A: Open directly in Browser
Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option B: Local Server (Recommended for smooth assets)
Use a light server extension like **Live Server** in VS Code, or run standard server commands in your console from this directory:
- **Python**: `python -m http.server 8000`
- **NodeJS**: `npx http-server`
- **PHP**: `php -S localhost:8000`

Access the portfolio at `http://localhost:8000` or `http://127.0.0.1:8000`.
