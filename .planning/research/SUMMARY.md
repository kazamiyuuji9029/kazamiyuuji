# Research Summary

**Synthesized:** 2026-07-19
**Sources:** FRUTIGER-DESIGN.md, ANIMATIONS.md, HOSTING.md, TECH-STACK.md

---

## Project Overview

A personal portfolio website using a Frutiger Aero / cyber design aesthetic. The goal is to build a visually distinctive, maximum-visual-effects portfolio that demonstrates technical skill and design sensibility. The site should be statically exportable, deployed for free, and built with a modern Next.js stack.

---

## Design Direction

**Frutiger Aero Cyber** -- a nostalgic-but-modern aesthetic built on optimistic techno-utopianism, skeuomorphic translucency, and nature-meets-digital imagery.

**Key Visual Elements:**
- Frosted glass / glassmorphism panels (`backdrop-filter: blur()`) for nav, hero card, and project cards (2-3 focal elements max, avoid over-glazing)
- Organic rounded shapes via `clip-path` (blob, wave, ellipse)
- Specular highlights and inner glow on translucent surfaces
- Layered depth: backgrounds are living environments (sky gradients, bokeh), UI floats on top
- Custom cursor with hover-aware effects on interactive elements

**Color Palette:**
| Role | Hex | Name |
|------|-----|------|
| Primary | `#6DB3F2` | Aero Blue |
| Primary Dark | `#1A5276` | Deep Aqua |
| Accent | `#00CED1` | Teal Glow |
| Accent Bright | `#00BFFF` | Electric Cyan |
| Neutral Dark | `#1B2631` | Obsidian |
| Neutral Light | `#F2F3F4` | Frost |

**Typography:** Inter (body/UI), system font fallbacks. Clean, geometric sans-serif that complements the aesthetic.

**Key Constraint:** White text on glass over light backgrounds fails contrast. Always ensure readability via dark text on light glass, or darken backgrounds behind glass panels.

---

## Animation Strategy

**Stack:** Framer Motion (Motion) + GSAP ScrollTrigger + Lenis smooth scroll

| Library | Role |
|---------|------|
| Framer Motion 11.x | Page transitions, hover effects, layout morphs, scroll reveals (`whileInView`) |
| GSAP 3.x + ScrollTrigger | Complex scroll-pinned sequences, timeline-driven animations, scrubbing |
| Lenis | Smooth scroll foundation for premium feel |

**Phase Ordering:**
1. CSS animations first (ambient bokeh, water ripples, gradient shifts) -- always respect `prefers-reduced-motion`
2. Framer Motion for page transitions and component-level interactions
3. GSAP ScrollTrigger for scroll-pinned hero sections and project showcase sequences
4. Custom cursor system (last, non-essential for core functionality)

**Three.js / R3F:** Optional for hero 3D element. Use dynamic `import()` for code splitting. Requires `"use client"`, `React.Suspense`, and SSR guard (`typeof window !== 'undefined'`). Only add if time permits -- strong visual payoff but high implementation complexity.

**Critical:** All animations must have `prefers-reduced-motion` fallbacks. `backdrop-filter` needs `-webkit-` prefix for older Safari. Provide solid background fallback when blur is unsupported.

---

## Tech Stack Decision

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x (App Router) | Framework -- static export with `output: 'export'` |
| React | 19.x | UI library (pairs with R3F v9) |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling (CSS-first config, no JS config file) |
| Framer Motion | 11.x | Component animations |
| GSAP | 3.x | Scroll-triggered sequences |
| Three.js | 0.17x | 3D elements (optional) |
| @react-three/fiber | 9.x | React Three.js integration (optional) |

**Key Decisions:**
- **App Router** over Pages Router (Server Components, layouts, templates, streaming)
- **Tailwind v4** -- CSS-first `@theme` blocks replace `tailwind.config.js`
- **Static export** for maximum portability across hosts
- Most content as Server Components; only add `"use client"` for animations, 3D, forms, and browser API usage
- Use `template.tsx` (not `layout.tsx`) for page transition animations since templates remount on navigation

**Core Web Vitals:** Use `next/image` with priority for hero, `next/font` for font loading, defer 3D scenes until after main content loads.

---

## Hosting Decision

**Primary: Vercel (Hobby plan)** -- best DX for Next.js, zero config, preview deployments per PR.

**Alternative: Cloudflare Pages** -- if commercial use is needed (Vercel Hobby is non-commercial only). Unlimited bandwidth, 300+ edge PoPs, free commercial use.

| Situation | Recommendation |
|-----------|---------------|
| Learning/personal portfolio | Vercel Hobby (free) |
| Freelancer/business portfolio | Cloudflare Pages (free, commercial use OK) |
| Maximum performance budget | Cloudflare Pages (300+ edge PoPs, unlimited bandwidth) |

**Pragmatic path:** Build with `output: 'export'` for portability. Deploy to Vercel during development. Buy domain from Cloudflare Registrar (~$10/year). Migrate to Cloudflare Pages if needed later.

---

## Key Risks and Considerations

**Design:**
- Over-glazing -- too many glass panels creates visual noise. Limit to 2-3 focal elements
- Thin line between "retro" and "dated" -- must read as intentional nostalgia with modern execution, not a 2009 website
- Stock photo uncanny valley -- use CSS-only gradients or carefully curated assets, not generic stock photos

**Animation/Performance:**
- `backdrop-filter` is GPU-intensive on large areas. Limit blur radius to 10-20px, reduce glass panels on mobile
- Water ripple and bokeh animations must respect `prefers-reduced-motion`
- Three.js/3D adds significant bundle size and SSR complexity -- defer unless time permits

**Technical:**
- Three.js SSR issues: `ReferenceError: window is not defined` -- requires dynamic import with SSR guard
- R3F version mismatch: v8 requires React 18, v9 requires React 18/19 -- verify compatibility
- `"use client"` boundary discipline -- only add when truly needed, most content should be Server Components
- Hydration mismatches from 3D canvas or animation state differences between server and client

**Hosting:**
- Vercel Hobby plan prohibits commercial use -- switch to Cloudflare Pages if portfolio serves business purposes
- Static export means no server-side features (API routes, ISR, middleware) -- acceptable for a portfolio

---

## Recommendation Summary

Build a Next.js 16 App Router portfolio with static export, using Tailwind CSS v4 for styling and the Frutiger Aero cyber aesthetic defined in the design research. Animation stack should be layered: CSS ambient effects first (bokeh, ripples, gradients), then Framer Motion for page transitions and component interactions, then GSAP ScrollTrigger for scroll-pinned sequences. Lenis provides smooth scroll as the foundation. Three.js/R3F is optional for a hero 3D element -- defer to a later phase if time permits. Deploy to Vercel Hobby during development for best DX; switch to Cloudflare Pages if commercial use is needed. The design must balance nostalgic glassmorphism with modern execution -- 2-3 glass focal elements max, `prefers-reduced-motion` support mandatory, and careful contrast management for text readability. Phase the build: project scaffolding and design system first, then content pages with animations, then scroll sequences, and finally 3D enhancements if time allows.

---

## Research Confidence

| Area | Confidence | Notes |
|------|------------|-------|
| Design Direction | HIGH | Well-documented aesthetic with clear CSS reference patterns |
| Animation Strategy | HIGH | Proven production stack (Framer Motion + GSAP + Lenis) |
| Tech Stack | HIGH | Official docs, version compatibility verified |
| Hosting | HIGH | Based on official pricing pages and documentation |
