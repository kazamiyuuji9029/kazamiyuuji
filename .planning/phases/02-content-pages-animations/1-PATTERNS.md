# Phase 2: Content Pages & Animations - Pattern Map

**Mapped:** 2026-07-20
**Files analyzed:** 15 source files (Phase 1 scaffolding)
**Analogs found:** 5 / 15

## Existing Files to Modify

| File | Role | Data Flow | Pattern Source | Notes |
|------|------|-----------|----------------|-------|
| `app/layout.tsx` | config | request-response | Phase 1 (RESEARCH.md) | Add LazyMotion, SmoothScroll, CustomCursor |
| `app/page.tsx` | component | request-response | Phase 1 (CONTEXT.md) | Add ScrollReveal, HoverEffect, enriched content |
| `app/about/page.tsx` | component | request-response | Phase 1 (CONTEXT.md) | Add ScrollReveal, HoverEffect, enriched content |
| `app/gallery/page.tsx` | component | request-response | Phase 1 (CONTEXT.md) | Add gallery data, images, ScrollReveal, HoverEffect |
| `app/contact/page.tsx` | component | request-response | Phase 1 (CONTEXT.md) | Add ScrollReveal, HoverEffect, social links |
| `app/globals.css` | config | batch | Phase 1 (RESEARCH.md) | Add skeleton shimmer animation |
| `lib/data/portfolio.ts` | config | batch | Phase 1 (CONTEXT.md) | Enrich with gallery items, social links |
| `lib/animations.ts` | config | batch | Phase 1 (CONTEXT.md) | May need update for new variants |
| `components/layout/Navigation.tsx` | component | request-response | Phase 1 (CONTEXT.md) | No changes needed |
| `components/layout/Footer.tsx` | component | request-response | Phase 1 (CONTEXT.md) | No changes needed |

## New Files to Create

| New File | Role | Data Flow | Pattern Source | Notes |
|----------|------|-----------|----------------|-------|
| `app/template.tsx` | config | request-response | RESEARCH:TECH-STACK.md lines 120-145 | AnimatePresence page transitions |
| `components/animation/PageTransition.tsx` | component | request-response | RESEARCH:ANIMATIONS.md | Framer Motion page wrapper |
| `components/animation/ScrollReveal.tsx` | component | request-response | RESEARCH:ANIMATIONS.md | whileInView wrapper |
| `components/animation/HoverEffect.tsx` | component | request-response | RESEARCH:ANIMATIONS.md | Hover scale/glow wrapper |
| `components/animation/LoadingSkeleton.tsx` | component | request-response | RESEARCH:ANIMATIONS.md | CSS shimmer skeleton |
| `components/cursor/CustomCursor.tsx` | component | client-side | RESEARCH:ANIMATIONS.md lines 340-380 | Dot + ring cursor |
| `components/layout/SmoothScroll.tsx` | component | client-side | RESEARCH:ANIMATIONS.md | Lenis wrapper |

## Dependency Map

```
app/layout.tsx
  |-- LazyMotion (framer-motion)
  |-- SmoothScroll (lenis)
  |-- CustomCursor
  |-- Navigation
  |-- Footer
  |-- {children}

app/template.tsx
  |-- AnimatePresence (framer-motion)
  |-- usePathname (next/navigation)
  |-- PageTransition

app/page.tsx
  |-- ScrollReveal
  |-- HoverEffect
  |-- GlassPanel, Blob, Wave, Ellipse
  |-- Navigation, Footer

app/about/page.tsx
  |-- ScrollReveal
  |-- HoverEffect
  |-- GlassPanel, Blob, Ellipse
  |-- Navigation, Footer

app/gallery/page.tsx
  |-- ScrollReveal
  |-- HoverEffect
  |-- GlassPanel
  |-- Navigation, Footer

app/contact/page.tsx
  |-- ScrollReveal
  |-- HoverEffect
  |-- GlassPanel, Blob, Ellipse
  |-- Navigation, Footer
```

## Research Document References

| Document | Path | Key Content |
|----------|------|-------------|
| Tech Stack | `.planning/research/TECH-STACK.md` | template.tsx patterns, AnimatePresence |
| Animations | `.planning/research/ANIMATIONS.md` | Framer Motion, Lenis, cursor, skeleton |
| Context | `.planning/phases/02-content-pages-animations/CONTEXT.md` | Phase 2 locked decisions |
| Phase 1 Summary | `.planning/phases/01-scaffolding-design-system/01-01-SUMMARY.md` | What Phase 1 delivered |

## Metadata

**Analog search scope:** Phase 1 scaffolding (15 files)
**Files scanned:** 15 source files
**Pattern extraction date:** 2026-07-20
**Project state:** Phase 1 complete, Phase 2 building on existing scaffolding
