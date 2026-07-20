# Context: Phase 4 — 3D Enhancements

## Current State

Phases 1-3 are complete. The site is live at https://goat-six-bay.vercel.app with:
- Full design system (glassmorphism, organic shapes, Frutiger palette)
- 4 pages with content, animations, scroll reveals, hover effects
- Framer Motion + Lenis smooth scrolling
- Static export deployed to Vercel

## Decisions Made

### 3D Stack (Locked)
- **Three.js:** Core 3D library
- **React Three Fiber (R3F):** React renderer for Three.js
- **@react-three/drei:** Useful helpers (OrbitControls, Float, etc.)
- **Dynamic import:** All R3F components via `next/dynamic` with `ssr: false`

### Hero 3D Element (Locked)
- **Type:** Floating geometric shape (icosahedron or torus knot)
- **Style:** Wireframe with gradient material, matching Frutiger palette
- **Interaction:** Slow rotation, responds to mouse movement
- **Position:** Behind hero text in Home page
- **Performance:** Lazy-loaded via next/dynamic, loading fallback shown

### 3D Hover Effects (Locked)
- **Type:** CSS 3D transforms on gallery cards (not R3F)
- **Effect:** Card tilts toward mouse position (perspective + rotateX/Y)
- **Implementation:** Mouse move listener + CSS transform
- **No Three.js needed:** Pure CSS/JS for card hover

### SSR Safety (Locked)
- All R3F components wrapped with `next/dynamic` + `{ ssr: false }`
- Prevents "window is not defined" errors during static generation
- Loading state shown while 3D component loads

## Gray Areas

| Area | Decision | Rationale |
|------|----------|-----------|
| Hero shape | Icosahedron | Clean, geometric, Frutiger-appropriate |
| Material | MeshStandardMaterial + wireframe | Lightweight, visually striking |
| Mouse interaction | Subtle rotation following cursor | Engaging without being distracting |
| Card hover | CSS perspective transforms | No Three.js overhead for simple effect |

## Constraints
- Static export compatible (no SSR)
- Must not block initial page load (lazy import)
- Performance must remain acceptable (3D is optional enhancement)
- Fallback for WebGL-unsupported browsers
- `prefers-reduced-motion` should also disable 3D rotation
