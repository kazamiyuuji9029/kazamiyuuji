# Roadmap: Kazamiyuuji

## Phase 1: Scaffolding & Design System
**Goal:** Project foundation — Next.js, Tailwind, glassmorphism components, Frutiger cyber palette
**Duration:** ~2-3 hours
**Requirements covered:** SETUP-01 through SETUP-04, DESIGN-01 through DESIGN-05, A11Y-02
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Initialize Next.js 16, Tailwind v4, glassmorphism components, organic shapes, typography, global styles

Tasks:
1. Initialize Next.js project with App Router
2. Install and configure Tailwind CSS v4
3. Create project structure (components/, lib/, app/)
4. Define Frutiger cyber color palette (aqua blues, deep navy, frosted whites)
5. Build glassmorphism panel components
6. Create organic shape components (clip-path blob, wave, ellipse)
7. Set up typography system
8. Implement global styles (gradients, reflections, nature textures)
9. Add solid background fallbacks for non-backdrop-filter browsers
10. Commit and verify

**Success Criteria:** Dev server runs, design system components render correctly, all pages have proper Frutiger cyber styling foundation.

---

## Phase 2: Content Pages & Animations
**Goal:** All 4 pages with content, Framer Motion transitions, hover effects, smooth scroll, Lenis
**Duration:** ~4-5 hours
**Requirements covered:** PAGE-01 through PAGE-05, ANIM-01 through ANIM-06, CONTENT-01, CONTENT-02, PERF-01, PERF-02

Tasks:
1. Build Home page with hero section and navigation
2. Build About page with bio/info section
3. Build Gallery page with image grid
4. Build Contact page with contact form/info
5. Implement responsive navigation (mobile + desktop)
6. Set up Framer Motion AnimatePresence with template.tsx
7. Add page transition animations
8. Implement hover effects on cards, links, buttons
9. Add scroll-triggered reveal animations (whileInView)
10. Integrate Lenis smooth scrolling
11. Add custom cursor effects
12. Create loading animations / skeleton screens
13. Lazy load 3D canvas (not blocking initial load)
14. Configure lazy motion with domAnimation
15. Load placeholder images and text content
16. Commit and verify

**Success Criteria:** All 4 pages render with content, navigation works, animations play smoothly, page transitions work, hover effects functional.

---

## Phase 3: Hosting, Accessibility & Polish
**Goal:** Deploy to Vercel, ensure accessibility, optimize performance
**Duration:** ~1-2 hours
**Requirements covered:** HOST-01 through HOST-04, A11Y-01

Tasks:
1. Configure static export (output: 'export')
2. Test build and verify no errors
3. Deploy to Vercel (free Hobby tier)
4. Verify public URL works (kazamiyuuji.vercel.app or similar)
5. Add prefers-reduced-motion support for all animations
6. Test on mobile devices
7. Performance audit (Lighthouse)
8. Commit and verify

**Success Criteria:** Site is live on public URL, Lighthouse score >90, accessibility basics covered.

---

## Phase 4: 3D Enhancements
**Goal:** Add Three.js/R3F hero element and 3D hover effects
**Duration:** ~2-3 hours
**Requirements covered:** 3D-01, 3D-02, 3D-03

Tasks:
1. Install Three.js and React Three Fiber
2. Create 3D hero scene with dynamic import
3. Ensure R3F components use next/dynamic with ssr: false
4. Add 3D hover effects on project cards (CSS transforms)
5. Test performance and fallbacks
6. Final commit and verification

**Success Criteria:** 3D hero element renders, 3D hover effects work, no SSR errors, performance acceptable.

---

## Phase Summary

| Phase | Name | Duration | Requirements |
|-------|------|----------|--------------|
| 1 | Scaffolding & Design System | ~2-3h | 10 |
| 2 | Content Pages & Animations | ~4-5h | 16 |
| 3 | Hosting, Accessibility & Polish | ~1-2h | 5 |
| 4 | 3D Enhancements | ~2-3h | 3 |
| **Total** | | **~9-13h** | **34** |

---
*Roadmap created: 2026-07-19*
