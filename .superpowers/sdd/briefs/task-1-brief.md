# Task 1: Update CSS Design System

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: None (foundational task)
- Produces: CSS custom properties and classes used by all components

## Steps

### Step 1: Replace color palette in globals.css

Open `app/globals.css` and replace the entire content with:

```css
@import "tailwindcss";

/* ================================================================
   Kazamiyuuji — Frutiger Aero Design System
   Tailwind CSS v4 — CSS-first configuration
   ================================================================ */

/* ---------------------------------------------------------------
   Design Tokens via @theme
   --------------------------------------------------------------- */
@theme inline {
  /* --- Color Palette --- */
  --color-primary: #4A9BD9;
  --color-accent: #2ECC71;
  --color-light-blue: #87CEEB;
  --color-dark: #1A5276;
  --color-surface: #334155;
  --color-nature: #2ECC71;
  --color-solar: #F1C40F;

  /* --- Semantic Colors --- */
  --color-bg-primary: #E8F4FD;
  --color-bg-secondary: #B3D9F2;
  --color-bg-card: rgba(255, 255, 255, 0.7);

  /* --- Typography --- */
  --font-body: var(--font-outfit);

  /* --- Spacing --- */
  --radius-card: 16px;
  --radius-button: 12px;
  --radius-full: 9999px;

  /* --- Shadows --- */
  --shadow-glow-primary: 0 0 20px rgba(74, 155, 217, 0.3);
  --shadow-glow-accent: 0 0 20px rgba(46, 204, 113, 0.3);
  --shadow-soft: 0 8px 32px rgba(74, 155, 217, 0.1);
}

/* ---------------------------------------------------------------
   Glass Panel System
   --------------------------------------------------------------- */
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
}

/* Glossy highlight at top */
.glass-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
}

.glass-panel--hero {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 48px rgba(74, 155, 217, 0.15);
}

.glass-panel--nav {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 0;
}

.glass-panel--card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.85);
  transition: all 0.3s ease;
}

.glass-panel--card:hover {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(25px);
  border-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 12px 40px rgba(74, 155, 217, 0.2);
  transform: translateY(-4px);
}

/* ---------------------------------------------------------------
   Gradient Text
   --------------------------------------------------------------- */
.gradient-primary {
  background: linear-gradient(135deg, #4A9BD9, #87CEEB, #4A9BD9);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ---------------------------------------------------------------
   Bubbles Animation
   --------------------------------------------------------------- */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-40px) translateX(-5px);
    opacity: 0.7;
  }
  75% {
    transform: translateY(-20px) translateX(-10px);
    opacity: 0.9;
  }
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.8),
    rgba(135, 206, 235, 0.4)
  );
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 -5px 15px rgba(74, 155, 217, 0.2);
  animation: float var(--duration, 6s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

/* ---------------------------------------------------------------
   Light Rays Effect
   --------------------------------------------------------------- */
.light-rays {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(135, 206, 235, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(74, 155, 217, 0.1) 0%, transparent 50%);
  z-index: 0;
}

/* ---------------------------------------------------------------
   Button Styles
   --------------------------------------------------------------- */
.btn-primary {
  background: linear-gradient(135deg, #4A9BD9, #87CEEB);
  color: white;
  padding: 12px 32px;
  border-radius: var(--radius-button);
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 155, 217, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 155, 217, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.7);
  color: #4A9BD9;
  padding: 12px 32px;
  border-radius: var(--radius-button);
  font-weight: 600;
  border: 1px solid rgba(74, 155, 217, 0.3);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: #4A9BD9;
  transform: translateY(-2px);
}

/* ---------------------------------------------------------------
   Utility Animations
   --------------------------------------------------------------- */
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Hide custom cursor on touch devices */
@media (pointer: coarse) {
  .custom-cursor { display: none !important; }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Step 2: Verify CSS compiles

Run: `npm run build`
Expected: Build succeeds with no CSS errors

### Step 3: Commit

```bash
git add app/globals.css
git commit -m "feat(design): update CSS to Frutiger Aero palette and glass styles"
```
