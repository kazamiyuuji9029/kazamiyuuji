# Context: Phase 2 — Content Pages & Animations

## Decisions Made

### Animation Stack (Locked)
- **Framer Motion (Motion) v11+:** Page transitions, hover effects, scroll reveals
- **Lenis:** Smooth scrolling layer (replaces native scroll)
- **LazyMotion (domAnimation):** Bundle optimization — load only essential Framer Motion features
- **No GSAP yet:** Deferred to Phase 3 (V2-ANIM-01, V2-ANIM-02)

### Page Transitions (Locked)
- **Approach:** `AnimatePresence` in `app/template.tsx` wrapping `{children}`
- **Animation:** Fade + slide up (opacity 0→1, y: 20→0, duration: 0.3s)
- **Keyed on:** `usePathname()` for route changes

### Smooth Scrolling (Locked)
- **Library:** Lenis via `@studio-freight/lenis` (or `lenis` package)
- **Wrapper:** Client component `SmoothScroll` wrapping children in layout
- **Integration:** Lenis `useEffect` hook in wrapper component

### Custom Cursor (Locked)
- **Hidden on:** Touch devices (`@media (pointer: coarse)`)
- **Style:** 8px dot + 32px ring, mix-blend-mode: difference
- **Colors:** White ring on dark backgrounds, primary color on light
- **Position:** `useEffect` with `mousemove` event listener

### Content Strategy (Locked)
- **Placeholder images:** Use `picsum.photos` (free, no API key needed)
- **Text content:** Meaningful placeholder text in `lib/data/portfolio.ts`
- **Gallery:** Grid of 6 project cards with image + title + description
- **About:** Bio, skills, philosophy sections
- **Contact:** Functional form layout (no backend — static export)

### Performance (Locked)
- **LazyMotion:** Wrap app in `LazyMotion` with `domAnimation` features
- **3D canvas:** Deferred to Phase 4, but lazy-load pattern established now
- **Images:** Use `next/image` with placeholder blur for gallery

### Component Structure (Locked)
```
app/
  template.tsx        # AnimatePresence page transitions
components/
  animation/
    PageTransition.tsx  # Framer Motion page wrapper
    ScrollReveal.tsx    # whileInView wrapper
    HoverEffect.tsx     # Hover scale/glow wrapper
    LoadingSkeleton.tsx # Skeleton loading states
  cursor/
    CustomCursor.tsx    # Dot + ring cursor
  layout/
    SmoothScroll.tsx    # Lenis wrapper (client component)
lib/
  data/portfolio.ts   # Updated with richer content
```

## Gray Areas Resolved

| Area | Decision | Rationale |
|------|----------|-----------|
| Lenis package | `lenis` (npm) | Official package name, darkroomengineering/lenis |
| Cursor blend mode | `mix-blend-mode: difference` | Standard for Frutiger aesthetic, high contrast |
| Skeleton loading | CSS-only shimmer | No extra dependency, lightweight |
| Gallery images | picsum.photos URLs | Free, reliable, no API key |
| Page transition style | Fade + slide up | Clean, professional, Frutiger-appropriate |

## Deferred to Later Phases

- GSAP ScrollTrigger (Phase 3 — V2-ANIM-01)
- Horizontal scroll sequences (Phase 3 — V2-ANIM-02)
- Text character reveal animations (Phase 3 — V2-ANIM-03)
- Dark/light mode toggle (Phase 3 — V2-FEAT-01)

## Constraints

- Static export compatible (no server-side rendering at runtime)
- Zero cost — no paid services
- prefers-reduced-motion support required
- Touch devices must not show custom cursor
- Animations must not block initial page load

---
*Context created: 2026-07-20*
