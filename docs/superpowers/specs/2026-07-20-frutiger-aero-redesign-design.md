# Frutiger Aero Redesign — Design Spec

**Date:** 2026-07-20
**Author:** Mochi + Claude
**Status:** Approved

---

## Overview

Complete visual redesign of the Kazamiyuuji portfolio from dark theme to classic Frutiger Aero aesthetic. Light, glossy, vibrant — inspired by Windows Vista/7 era design.

**Client:** Mochi (game developer)
**Portfolio focus:** Game development (all types of games)
**Style:** Classic Frutiger Aero (light blue/white, glossy, transparent)

---

## 1. Visual Identity

### Background
- **Primary gradient:** `linear-gradient(135deg, #E8F4FD 0%, #B3D9F2 50%, #FFFFFF 100%)`
- **Texture:** Subtle cloud/mist overlay (CSS or SVG)
- **Animated elements:** Floating bubbles drifting up/down

### Color Palette

| Color Name | Hex | Usage |
|------------|-----|-------|
| Frutiger Blue | `#4A9BD9` | Headings, links, accents |
| Sky Blue | `#87CEEB` | Gradients, hover states |
| White | `#FFFFFF` | Panel backgrounds |
| Light Gray | `#F0F4F8` | Secondary backgrounds |
| Nature Green | `#2ECC71` | Accents, success states |
| Solar Yellow | `#F1C40F` | Highlights, CTA buttons |
| Dark Text | `#334155` | Body text |

### Glass Panels
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.8);
box-shadow: 0 8px 32px rgba(74, 155, 217, 0.1);
```
- Glossy highlight line at top of panel
- Enhanced on hover: blur(25px), lighter border, larger shadow

### Typography
- **Font:** Outfit (keep existing)
- **Headings:** 700-800 weight, blue gradient text
- **Body:** 400 weight, dark gray (#334155)

---

## 2. Layout & Components

### Navigation
- Fixed top, glass panel with blur effect
- Logo: "Mochi" with blue gradient
- Links: Home, About, Gallery, Contact
- Mobile: hamburger menu with glass background

### Hero Section (Home)
- Large "Mochi" heading with blue gradient
- Subtitle: "Game Developer"
- Description: Short phrase about games
- Two CTA buttons: "View My Work" + "Contact Me"
- 3D sphere floating on right side (R3F)
- Bubbles/particles in background

### About Page
- Glass panel with information
- "About me" section
- Skills/technologies used
- Optional: experience timeline

### Gallery Page
- Card grid (2-3 columns)
- Each card: glass panel, placeholder image, title, description, tags
- Hover effect: card lifts and glows

### Contact Page
- Glass panel with form (name, email, message)
- Social links: GitHub + Email
- Optional: map or illustration

---

## 3. Animations & Effects

### Background Elements
- **Bubbles:** 8-12 animated circles floating up/down (CSS animation)
- **Light effects:** Subtle light rays / lens flare on background
- **3D sphere:** R3F sphere with reflections, slow rotation

### Page Transitions
- Framer Motion AnimatePresence — fade + slide between pages
- ScrollReveal for elements appearing on scroll

### Hover Effects
- Cards: slight lift + glow shadow + scale(1.02)
- Links: color change + underline animation
- Buttons: glow effect + slight lift

### Glass Panel Hover
- Blur increases (20px → 25px)
- Border becomes lighter
- Shadow grows slightly

### Custom Cursor
- Small blue circle with blur effect
- Follows mouse with slight delay
- Mix-blend-mode: difference

### Reduced Motion
- `prefers-reduced-motion: reduce` disables all animations

---

## 4. Content

### Name
- **Display name:** Mochi

### Profession
- **Role:** Game Developer
- **Focus:** All types of games (2D, 3D, web, indie)

### Pages
1. **Home:** Hero with name, tagline, CTA buttons, 3D element
2. **About:** Bio, skills, technologies
3. **Gallery:** 6 placeholder game projects with cards
4. **Contact:** Form + GitHub + Email links

### Placeholder Content
- Gallery: 6 fake game projects with placeholder images (picsum.photos)
- About: Generic game developer bio
- Contact: Working form (frontend only)

---

## 5. Technical Constraints

- **Framework:** Next.js App Router (keep existing)
- **Styling:** Tailwind CSS v4 (keep existing)
- **Animations:** Framer Motion + GSAP + Lenis (keep existing)
- **3D:** Three.js + React Three Fiber (keep existing)
- **Hosting:** Vercel Hobby (keep existing)
- **No new dependencies** — redesign is CSS/component changes only

---

## 6. Success Criteria

- [ ] Site loads with light blue/white gradient background
- [ ] Glass panels are clearly visible with blur and gloss
- [ ] Floating bubbles animate in background
- [ ] 3D sphere renders on home page
- [ ] All 4 pages have consistent Frutiger Aero styling
- [ ] Typography is readable with proper contrast
- [ ] Hover effects work on cards, links, buttons
- [ ] Mobile responsive
- [ ] Build passes without errors
- [ ] Deployed to Vercel

---

## 7. Out of Scope

- New pages beyond Home/About/Gallery/Contact
- Backend functionality (forms are frontend-only)
- New dependencies or packages
- Content management system
- Blog or news section
