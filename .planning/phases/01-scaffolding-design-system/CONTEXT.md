# Context: Phase 1 — Scaffolding & Design System

## Decisions Made

### Tech Stack (Locked)
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS v4 with CSS-first configuration (@theme blocks, not tailwind.config.js)
- **Package Manager:** npm (default)

### Design System (Locked)
- **Font:** Outfit (Google Fonts, free) — zaobljen, friendly, Frutiger vibe
- **Color Palette:**
  - Primary (Aqua): `#6DB3F2`
  - Accent (Teal): `#00CED1`
  - Light Blue: `#5DADE2`
  - Dark (Navy): `#1A5276`
  - White: `#F8F9FA`
  - Green (Nature): `#2ECC71`
  - Gold (Solar): `#F1C40F`

### Glassmorphism (Locked)
- **Elements with glass effect:** Hero panel + Contact panel (2 elements max)
- **Technique:** `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- **Fallback:** Solid backgrounds for `@supports not (backdrop-filter)`

### Organic Shapes (Locked)
- **Blob:** Amorfni oblik za Frutiger vibe (clip-path: polygon)
- **Wave:** Talasasta linija za sekcije/dividere
- **Ellipse:** Eliptični oblik za pozadinske elemente

### Project Structure (Locked)
```
app/
  layout.tsx          # Root layout with Outfit font
  page.tsx            # Home page
  about/page.tsx      # About page
  gallery/page.tsx    # Gallery page
  contact/page.tsx    # Contact page
  template.tsx        # Framer Motion page transitions
components/
  ui/                 # Reusable UI components
  glass/              # Glassmorphism panels
  shapes/             # Organic shapes (blob, wave, ellipse)
  layout/             # Navigation, footer
lib/
  animations.ts       # Framer Motion variants
  data/               # Portfolio content data
styles/
  globals.css         # Global styles, Tailwind @theme
```

## Research References

- `.planning/research/FRUTIGER-DESIGN.md` — Design philosophy, color palette, CSS techniques
- `.planning/research/TECH-STACK.md` — Next.js + Tailwind v4 integration patterns
- `.planning/research/ANIMATIONS.md` — Animation library comparison (Phase 2 reference)

## Gray Areas Resolved

| Area | Decision | Rationale |
|------|----------|-----------|
| Font | Outfit | Zaobljen, friendly, Frutiger aesthetic |
| Colors | Full palette (7 colors) | Complete Frutiger cyber look |
| Glass panels | Hero + Contact only | Avoid over-glazing (research recommendation) |
| Organic shapes | All three (blob, wave, ellipse) | Maximum visual variety |

## Deferred to Later Phases

- Framer Motion page transitions → Phase 2
- Lenis smooth scrolling → Phase 2
- GSAP ScrollTrigger → Phase 2
- Three.js/R3F 3D elements → Phase 4
- Custom cursor effects → Phase 2
- Deployment to Vercel → Phase 3

## Constraints

- Zero cost — no paid services
- Static export compatible (output: 'export')
- Mobile responsive
- prefers-reduced-motion support required
- Solid background fallbacks for glassmorphism

---
*Context created: 2026-07-19*
