# Context: Phase 3 — Hosting, Accessibility & Polish

## Current State

Phase 1 (scaffolding) and Phase 2 (content + animations) are complete. The site:
- Builds successfully with `npm run build`
- Generates static export in `out/` directory
- Has `output: "export"` and `images: { unoptimized: true }` in next.config.ts
- Has `prefers-reduced-motion: reduce` in globals.css (disables all animations)
- Has solid background fallbacks for non-backdrop-filter browsers (Phase 1 A11Y-02)

## Decisions Made

### Deployment (Locked)
- **Platform:** Vercel free Hobby tier
- **Method:** `npx vercel` CLI or GitHub integration
- **Cost:** $0 — Hobby tier covers personal projects
- **Domain:** kazamiyuuji.vercel.app (auto-assigned)

### Static Export (Already Done)
- `output: "export"` in next.config.ts ✅
- `images: { unoptimized: true }` ✅
- Build generates out/ with all HTML pages ✅

### Accessibility (Partially Done)
- `prefers-reduced-motion` in globals.css ✅
- Solid background fallbacks ✅
- Touch device cursor hiding ✅

## Gray Areas

| Area | Decision | Rationale |
|------|----------|-----------|
| Deploy method | CLI (`npx vercel`) | Simpler for first deploy, no GitHub setup needed |
| Lighthouse audit | Manual browser check | Free, no tooling needed |
| Mobile testing | Browser DevTools responsive mode | Sufficient for basic check |

## Constraints
- Zero cost — no paid services
- Static export only — no server-side rendering
- User must have Vercel account for deploy
