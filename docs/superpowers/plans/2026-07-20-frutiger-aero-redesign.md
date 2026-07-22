# Frutiger Aero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from dark theme to classic Frutiger Aero (light, glossy, vibrant blue/white)

**Architecture:** Keep existing Next.js structure, replace CSS design system and components with Frutiger Aero styling. Add animated bubbles component. Update all content for game developer "Mochi".

**Tech Stack:** Next.js App Router, Tailwind CSS v4, Framer Motion, Three.js/R3F, Lenis

## Global Constraints

- No new dependencies — redesign uses existing packages only
- Keep Outfit font (Google Fonts)
- Maintain responsive design (mobile-first)
- Preserve accessibility (semantic HTML, aria labels)
- Build must pass: `npm run build`
- Deploy to Vercel Hobby (free tier)

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `app/globals.css` | Modify | New color palette, glass styles, bubbles animation |
| `app/layout.tsx` | Modify | Background gradient, font updates |
| `app/page.tsx` | Modify | Hero redesign with gradient text, 3D sphere |
| `app/about/page.tsx` | Modify | Glass panels, new content |
| `app/gallery/page.tsx` | Modify | Card grid with new glass styling |
| `app/contact/page.tsx` | Modify | Form with glass styling |
| `components/bubbles/Bubbles.tsx` | Create | Animated floating bubbles |
| `components/glass/GlassPanel.tsx` | Modify | Updated glass styling |
| `components/layout/Navigation.tsx` | Modify | Glass nav with new colors |
| `components/layout/Footer.tsx` | Modify | Updated footer styling |
| `components/3d/FloatingShape.tsx` | Modify | Sphere instead of icosahedron |
| `components/3d/HeroScene.tsx` | Modify | Updated lighting for light theme |
| `lib/data/portfolio.ts` | Modify | New content for Mochi |

---

### Task 1: Update CSS Design System

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: None (foundational task)
- Produces: CSS custom properties and classes used by all components

- [ ] **Step 1: Replace color palette in globals.css**

Open `app/globals.css` and replace the `@theme inline` section:

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

- [ ] **Step 2: Verify CSS compiles**

Run: `npm run build`
Expected: Build succeeds with no CSS errors

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(design): update CSS to Frutiger Aero palette and glass styles"
```

---

### Task 2: Create Bubbles Component

**Files:**
- Create: `components/bubbles/Bubbles.tsx`

**Interfaces:**
- Consumes: CSS `.bubble` class from Task 1
- Produces: `<Bubbles />` component used in layout

- [ ] **Step 1: Create Bubbles component**

Create `components/bubbles/Bubbles.tsx`:

```tsx
"use client";

import React from "react";

interface Bubble {
  id: number;
  size: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
}

const bubbles: Bubble[] = [
  { id: 1, size: 60, left: "10%", top: "20%", duration: "6s", delay: "0s" },
  { id: 2, size: 40, left: "20%", top: "60%", duration: "8s", delay: "1s" },
  { id: 3, size: 80, left: "70%", top: "30%", duration: "7s", delay: "2s" },
  { id: 4, size: 30, left: "80%", top: "70%", duration: "9s", delay: "0.5s" },
  { id: 5, size: 50, left: "40%", top: "80%", duration: "6.5s", delay: "1.5s" },
  { id: 6, size: 35, left: "60%", top: "10%", duration: "7.5s", delay: "3s" },
  { id: 7, size: 45, left: "90%", top: "50%", duration: "8.5s", delay: "2.5s" },
  { id: 8, size: 25, left: "5%", top: "40%", duration: "5.5s", delay: "0.8s" },
];

export default function Bubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            top: bubble.top,
            "--duration": bubble.duration,
            "--delay": bubble.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify component compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/bubbles/Bubbles.tsx
git commit -m "feat(components): add animated Bubbles component"
```

---

### Task 3: Update Layout with Background

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `<Bubbles />` from Task 2, CSS from Task 1
- Produces: Updated layout wrapping all pages

- [ ] **Step 1: Update layout.tsx**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";
import Bubbles from "@/components/bubbles/Bubbles";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mochi | Game Developer",
  description: "Game developer portfolio — Frutiger Aero aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body
        className="min-h-screen font-[family-name:var(--font-body)]"
        style={{
          background: "linear-gradient(135deg, #E8F4FD 0%, #B3D9F2 50%, #FFFFFF 100%)",
        }}
      >
        <div className="light-rays" />
        <Bubbles />
        <CustomCursor />
        <SmoothScroll>
          <LazyMotion features={domAnimation}>
            {children}
          </LazyMotion>
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify layout renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): add light gradient background and bubbles"
```

---

### Task 4: Update Portfolio Data

**Files:**
- Modify: `lib/data/portfolio.ts`

**Interfaces:**
- Consumes: None
- Produces: Content used by all page components

- [ ] **Step 1: Replace portfolio.ts content**

Replace `lib/data/portfolio.ts` with:

```typescript
/**
 * Portfolio content data
 * Centralized content for all pages — Mochi, Game Developer
 */

export const siteMetadata = {
  title: "Mochi | Game Developer",
  description: "Game developer portfolio — Frutiger Aero aesthetic",
  author: "Mochi",
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroContent = {
  name: "Mochi",
  tagline: "Crafting Worlds, One Pixel at a Time",
  subtitle:
    "Game developer passionate about creating immersive experiences — from indie 2D adventures to 3D worlds.",
  cta: {
    primary: { label: "View My Work", href: "/gallery" },
    secondary: { label: "Contact Me", href: "/contact" },
  },
} as const;

export const aboutContent = {
  title: "About Me",
  description:
    "Hi, I'm Mochi — a game developer who loves bringing ideas to life through code and creativity.",
  sections: [
    {
      heading: "What I Do",
      body: "I create games across all platforms — 2D indie titles, 3D adventures, web-based casual games, and everything in between. Every project is a new opportunity to push boundaries and create something memorable.",
    },
    {
      heading: "My Approach",
      body: "Games are about experience. I focus on gameplay feel, visual polish, and those small details that make players smile. Whether it's a satisfying animation, a clever puzzle, or an atmospheric world — it's the little things that matter.",
    },
    {
      heading: "Skills",
      items: [
        "Unity / Unreal Engine",
        "Godot / GameMaker",
        "C# / C++ / GDScript",
        "Pixel Art / 2D Design",
        "3D Modeling (Blender)",
        "Game Design",
        "Level Design",
        "Audio Design",
      ],
    },
    {
      heading: "Tools I Use",
      body: "My toolkit spans engines (Unity, Unreal, Godot), languages (C#, C++, GDScript), and creative tools (Blender, Aseprite, FMOD). I pick the right tool for each project — no dogma, just results.",
    },
  ],
} as const;

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pixel Quest",
    description:
      "A retro-inspired 2D platformer with hand-crafted pixel art and tight controls. Explore enchanted dungeons and defeat bosses in this classic adventure.",
    tags: ["Unity", "2D", "Platformer"],
    image: "https://picsum.photos/seed/pixelquest/800/600",
  },
  {
    id: 2,
    title: "SkyBound",
    description:
      "An open-world 3D exploration game set in a floating archipelago. Soar between islands, discover secrets, and unravel an ancient mystery.",
    tags: ["Unreal Engine", "3D", "Open World"],
    image: "https://picsum.photos/seed/skybound/800/600",
  },
  {
    id: 3,
    title: "Bubble Pop Deluxe",
    description:
      "A casual mobile puzzle game with satisfying physics-based bubble mechanics. Over 200 levels of colorful, relaxing fun.",
    tags: ["Godot", "Mobile", "Puzzle"],
    image: "https://picsum.photos/seed/bubblepop/800/600",
  },
  {
    id: 4,
    title: "Neon Racer",
    description:
      "A fast-paced arcade racer with synthwave aesthetics. Drift through neon-lit cityscapes and compete on global leaderboards.",
    tags: ["Unity", "3D", "Racing"],
    image: "https://picsum.photos/seed/neonracer/800/600",
  },
  {
    id: 5,
    title: "Dungeon Crawler",
    description:
      "A roguelike dungeon crawler with procedural generation. Every run is unique — adapt, survive, and conquer the ever-changing depths.",
    tags: ["Godot", "2D", "Roguelike"],
    image: "https://picsum.photos/seed/dungeoncrawler/800/600",
  },
  {
    id: 6,
    title: "Starfield Explorer",
    description:
      "A web-based space exploration game built for the browser. Navigate star systems, trade resources, and build your cosmic empire.",
    tags: ["WebGL", "Browser", "Strategy"],
    image: "https://picsum.photos/seed/starfield/800/600",
  },
];

export const galleryContent = {
  title: "My Games",
  description:
    "A collection of games I've developed — from indie adventures to casual puzzles.",
} as const;

export const contactContent = {
  title: "Get in Touch",
  description:
    "Want to collaborate, have a question, or just want to say hi? Feel free to reach out!",
  email: "hello@mochi.dev",
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/kazamiyuuji9029",
      label: "GitHub",
    },
    {
      platform: "Email",
      url: "mailto:hello@mochi.dev",
      label: "Email",
    },
  ],
} as const;
```

- [ ] **Step 2: Verify data compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add lib/data/portfolio.ts
git commit -m "feat(content): update portfolio data for Mochi game developer"
```

---

### Task 5: Redesign Navigation

**Files:**
- Modify: `components/layout/Navigation.tsx`

**Interfaces:**
- Consumes: `navigationLinks` from Task 4, CSS from Task 1
- Produces: Updated navigation used in all pages

- [ ] **Step 1: Update Navigation.tsx**

Replace `components/layout/Navigation.tsx` with:

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import GlassPanel from "@/components/glass/GlassPanel";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassPanel
      variant="nav"
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold gradient-primary bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Mochi
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-surface/70 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-surface/70 hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-surface/70 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </GlassPanel>
  );
}
```

- [ ] **Step 2: Verify navigation renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navigation.tsx
git commit -m "feat(nav): redesign navigation with Frutiger Aero styling"
```

---

### Task 6: Redesign Hero/Home Page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `heroContent` from Task 4, `<Bubbles />` style, CSS from Task 1
- Produces: Home page layout

- [ ] **Step 1: Update Home page**

Replace `app/page.tsx` with:

```tsx
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import ScrollReveal from "@/components/animation/ScrollReveal";
import HeroSceneLoader from "@/components/3d/HeroSceneLoader";
import { heroContent } from "@/lib/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 3D Hero Scene (lazy-loaded) */}
      <HeroSceneLoader />

      <Navigation />

      <main className="flex-1 flex items-center justify-center px-6 pt-24 relative z-10">
        <ScrollReveal className="w-full">
          <GlassPanel variant="hero" className="max-w-3xl text-center p-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
              {heroContent.name}
            </h1>
            <p className="text-2xl text-surface/80 mb-4 font-light">
              {heroContent.tagline}
            </p>
            <p className="text-lg text-surface/60 mb-10 max-w-lg mx-auto leading-relaxed">
              {heroContent.subtitle}
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href={heroContent.cta.primary.href}
                className="btn-primary"
              >
                {heroContent.cta.primary.label}
              </a>
              <a
                href={heroContent.cta.secondary.href}
                className="btn-secondary"
              >
                {heroContent.cta.secondary.label}
              </a>
            </div>
          </GlassPanel>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify home page renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): redesign hero with Frutiger Aero glass panel"
```

---

### Task 7: Redesign About Page

**Files:**
- Modify: `app/about/page.tsx`

**Interfaces:**
- Consumes: `aboutContent` from Task 4
- Produces: About page

- [ ] **Step 1: Update About page**

Replace `app/about/page.tsx` with:

```tsx
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { aboutContent } from "@/lib/data/portfolio";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-16 max-w-4xl mx-auto w-full">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {aboutContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-12">
            {aboutContent.description}
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {aboutContent.sections.map((section, index) => (
            <ScrollReveal key={section.heading} delay={index * 0.1}>
              <GlassPanel className="p-8">
                <h2 className="text-xl font-bold text-primary mb-4">
                  {section.heading}
                </h2>
                {"body" in section ? (
                  <p className="text-surface/70 leading-relaxed">
                    {section.body}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {section.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify about page renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat(about): redesign about page with glass panels"
```

---

### Task 8: Redesign Gallery Page

**Files:**
- Modify: `app/gallery/page.tsx`

**Interfaces:**
- Consumes: `galleryContent`, `projects` from Task 4
- Produces: Gallery page

- [ ] **Step 1: Update Gallery page**

Replace `app/gallery/page.tsx` with:

```tsx
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import CardHover from "@/components/gallery/CardHover";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { galleryContent, projects } from "@/lib/data/portfolio";

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-16 max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {galleryContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-12">
            {galleryContent.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <CardHover>
                <GlassPanel variant="card" className="p-6 h-full flex flex-col">
                  <div className="aspect-video rounded-[var(--radius-card)] overflow-hidden mb-4 bg-primary/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-surface mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-surface/60 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify gallery page renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/gallery/page.tsx
git commit -m "feat(gallery): redesign gallery with glass cards"
```

---

### Task 9: Redesign Contact Page

**Files:**
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `contactContent` from Task 4
- Produces: Contact page

- [ ] **Step 1: Update Contact page**

Replace `app/contact/page.tsx` with:

```tsx
"use client";

import React, { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { contactContent } from "@/lib/data/portfolio";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only — no backend
    alert("Thanks for your message! (This is a demo — no backend connected)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-16 max-w-4xl mx-auto w-full">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {contactContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-12">
            {contactContent.description}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ScrollReveal>
            <GlassPanel className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-surface/70 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/50 border border-white/80 text-surface placeholder-surface/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-surface/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/50 border border-white/80 text-surface placeholder-surface/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-surface/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/50 border border-white/80 text-surface placeholder-surface/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </GlassPanel>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.1}>
            <GlassPanel className="p-8">
              <h2 className="text-xl font-bold text-primary mb-6">Connect</h2>
              <div className="space-y-4">
                {contactContent.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-[var(--radius-button)] bg-white/50 hover:bg-white/70 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary font-bold">
                        {social.platform[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-surface">{social.platform}</p>
                      <p className="text-sm text-surface/50">{social.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </GlassPanel>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify contact page renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat(contact): redesign contact page with glass form"
```

---

### Task 10: Update 3D Hero Scene

**Files:**
- Modify: `components/3d/FloatingShape.tsx`
- Modify: `components/3d/HeroScene.tsx`

**Interfaces:**
- Consumes: None
- Produces: Updated 3D scene for light theme

- [ ] **Step 1: Update FloatingShape to use sphere**

Replace `components/3d/FloatingShape.tsx` with:

```tsx
"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  color?: string;
  distort?: number;
  speed?: number;
  size?: number;
}

export default function FloatingShape({
  color = "#4A9BD9",
  distort = 0.3,
  speed = 2,
  size = 1.5,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}
```

- [ ] **Step 2: Update HeroScene for light theme**

Replace `components/3d/HeroScene.tsx` with:

```tsx
"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import FloatingShape from "./FloatingShape";

function HeroSceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#87CEEB" />
      
      <FloatingShape 
        color="#4A9BD9" 
        size={1.8} 
        distort={0.4} 
        speed={1.5} 
      />
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={4}
      />
      
      <Environment preset="city" />
    </>
  );
}

function Fallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
    </div>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <HeroSceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 3: Verify 3D scene compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add components/3d/FloatingShape.tsx components/3d/HeroScene.tsx
git commit -m "feat(3d): update hero scene with sphere and light theme"
```

---

### Task 11: Update Footer

**Files:**
- Modify: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `siteMetadata` from Task 4
- Produces: Footer component

- [ ] **Step 1: Update Footer**

Replace `components/layout/Footer.tsx` with:

```tsx
import React from "react";
import { siteMetadata } from "@/lib/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center">
      <p className="text-sm text-surface/50">
        &copy; {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Verify footer renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat(footer): update footer with Mochi branding"
```

---

### Task 12: Final Build & Deploy

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified build ready for deployment

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Verify all pages render**

Check build output for:
- `/` (Home)
- `/about`
- `/gallery`
- `/contact`

All should show "✓ Compiled successfully"

- [ ] **Step 3: Push to main**

```bash
git push origin main
```

- [ ] **Step 4: Verify Vercel deployment**

Wait for Vercel to auto-deploy from main. Check:
- https://goat-six-bay.vercel.app loads
- Light blue/white gradient background visible
- Glass panels clearly visible
- Bubbles floating in background
- 3D sphere renders on home page
- All 4 pages accessible

- [ ] **Step 5: Final commit message**

```bash
git commit --allow-empty -m "chore: verify Frutiger Aero redesign deployed to Vercel"
```

---

## Summary

| Task | Description | Files Changed |
|------|-------------|---------------|
| 1 | Update CSS Design System | `globals.css` |
| 2 | Create Bubbles Component | `Bubbles.tsx` (new) |
| 3 | Update Layout | `layout.tsx` |
| 4 | Update Portfolio Data | `portfolio.ts` |
| 5 | Redesign Navigation | `Navigation.tsx` |
| 6 | Redesign Home Page | `page.tsx` |
| 7 | Redesign About Page | `about/page.tsx` |
| 8 | Redesign Gallery Page | `gallery/page.tsx` |
| 9 | Redesign Contact Page | `contact/page.tsx` |
| 10 | Update 3D Scene | `FloatingShape.tsx`, `HeroScene.tsx` |
| 11 | Update Footer | `Footer.tsx` |
| 12 | Final Build & Deploy | Verification |

**Total:** 12 tasks, 13 files modified/created
