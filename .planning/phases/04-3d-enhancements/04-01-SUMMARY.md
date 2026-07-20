---
phase: 04-3d-enhancements
plan: 01
subsystem: ui
tags: [three.js, react-three-fiber, drei, 3d, framer-motion, css-transforms]

requires:
  - phase: 01-foundation
    provides: Next.js app with App Router, Tailwind CSS, base layout
  - phase: 03-deploy
    provides: Working static export build pipeline
provides:
  - 3D hero element with floating wireframe icosahedron
  - 3D tilt hover effect on gallery cards
  - Lazy-loaded R3F scene via next/dynamic
affects: [gallery, hero, performance]

tech-stack:
  added: [three.js, @react-three/fiber, @react-three/drei]
  patterns: [dynamic-import-ssr-false, css-perspective-transform, r3f-canvas]

key-files:
  created:
    - components/3d/FloatingShape.tsx
    - components/3d/HeroScene.tsx
    - components/3d/HeroSceneLoader.tsx
    - components/gallery/CardHover.tsx
  modified:
    - app/page.tsx
    - app/gallery/page.tsx
    - package.json

key-decisions:
  - "Created HeroSceneLoader Client Component wrapper because ssr:false is not allowed in Server Components per Next.js docs"
  - "Replaced HoverEffect with CardHover for 3D perspective tilt instead of simple scale"
  - "Added prefers-reduced-motion detection via matchMedia hook in FloatingShape for WebGL accessibility"

patterns-established:
  - "R3F components always wrapped in Client Component with next/dynamic ssr:false"
  - "CSS perspective transforms for 3D card hover with prefers-reduced-motion fallback"

requirements-completed: [3D-01, 3D-02, 3D-03]

coverage:
  - id: D1
    description: "3D hero element with floating wireframe icosahedron in Frutiger palette"
    requirement: "3D-01"
    verification:
      - kind: automated_ui
        ref: "npm run build && ls out/index.html"
        status: pass
    human_judgment: false
  - id: D2
    description: "HeroScene lazy-loaded via next/dynamic with ssr:false"
    requirement: "3D-01"
    verification:
      - kind: automated_ui
        ref: "grep -q 'HeroSceneLoader' app/page.tsx"
        status: pass
    human_judgment: false
  - id: D3
    description: "3D tilt hover effect on gallery cards with CSS perspective transforms"
    requirement: "3D-02"
    verification:
      - kind: automated_ui
        ref: "grep -q 'CardHover' app/gallery/page.tsx"
        status: pass
    human_judgment: false
  - id: D4
    description: "prefers-reduced-motion disables 3D animations for accessibility"
    requirement: "3D-03"
    verification:
      - kind: automated_ui
        ref: "grep -q 'prefers-reduced-motion' components/3d/FloatingShape.tsx"
        status: pass
    human_judgment: false

duration: 8min
completed: 2026-07-20
status: complete
---

# Phase 4 Plan 1: 3D Enhancements Summary

**Wireframe icosahedron hero with React Three Fiber, CSS perspective card tilt, lazy-loaded via next/dynamic**

## Performance

- **Duration:** 8 min
- **Started:** 2026-07-20T01:08:57Z
- **Completed:** 2026-07-20T01:16:42Z
- **Tasks:** 5
- **Files modified:** 8

## Accomplishments
- 3D hero scene with floating wireframe icosahedron using R3F Canvas, Float, and directional/point lighting
- Gallery cards with interactive 3D perspective tilt on mouse move via CSS transforms
- Lazy loading via next/dynamic with ssr:false prevents SSR errors in static export
- Full accessibility: prefers-reduced-motion disables both CSS and WebGL animations

## Task Commits

Each task was committed atomically:

1. **Task 1: Install three.js packages** - `0b0b506` (chore)
2. **Task 2: Create 3D components** - `8b243b4` (feat)
3. **Task 3: Integrate HeroScene** - `b0fa776` (feat)
4. **Task 4: CardHover and gallery update** - `b10c9c4` (feat)
5. **Task 5: Verify build** - (verification only, no commit)

**Plan metadata:** 04-01-SUMMARY.md (docs: complete plan)

## Files Created/Modified
- `components/3d/FloatingShape.tsx` - Wireframe icosahedron with Frutiger palette, rotation animation, prefers-reduced-motion
- `components/3d/HeroScene.tsx` - R3F Canvas with Float wrapper, lighting, Suspense fallback
- `components/3d/HeroSceneLoader.tsx` - Client Component wrapper for next/dynamic ssr:false
- `components/gallery/CardHover.tsx` - CSS perspective transform tilt on mouse move
- `app/page.tsx` - Added HeroSceneLoader as background 3D element
- `app/gallery/page.tsx` - Replaced HoverEffect with CardHover for 3D tilt
- `package.json` - Added three, @react-three/fiber, @react-three/drei, @types/three

## Decisions Made
- Created HeroSceneLoader Client Component wrapper because ssr:false is not allowed in Server Components per Next.js docs (line 95 of lazy-loading.md)
- Replaced HoverEffect (simple scale + y offset) with CardHover (CSS perspective transforms) for more immersive 3D card interaction
- Added prefers-reduced-motion detection via matchMedia hook in FloatingShape for WebGL accessibility (CSS media query alone cannot affect WebGL rendering)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Created HeroSceneLoader Client Component wrapper**
- **Found during:** Task 2 (3D component creation)
- **Issue:** Next.js docs confirm ssr:false with next/dynamic is NOT supported in Server Components. app/page.tsx is a Server Component (no "use client" directive). Using dynamic({ ssr: false }) directly in the page would cause a build error.
- **Fix:** Created components/3d/HeroSceneLoader.tsx as a thin "use client" wrapper that imports HeroScene via dynamic({ ssr: false })
- **Files modified:** components/3d/HeroSceneLoader.tsx
- **Verification:** Build succeeds with no SSR errors
- **Committed in:** 8b243b4 (Task 2 commit)

**2. [Rule 2 - Missing Critical] Added prefers-reduced-motion to FloatingShape**
- **Found during:** Task 4 (CardHover creation)
- **Issue:** Plan specified prefers-reduced-motion for accessibility but CSS media query alone cannot stop WebGL rendering in R3F. Need JavaScript detection.
- **Fix:** Added usePrefersReducedMotion hook using window.matchMedia to detect preference and skip useFrame animation updates
- **Files modified:** components/3d/FloatingShape.tsx
- **Verification:** Hook checks media query, skips animation when reduced motion preferred
- **Committed in:** b10c9c4 (Task 4 commit)

---

**Total deviations:** 2 auto-fixed (2 missing critical)
**Impact on plan:** Both auto-fixes essential for correctness (SSR compatibility) and accessibility compliance. No scope creep.

## Issues Encountered
None - plan executed cleanly after the two auto-fixes.

## Known Stubs
None - all components are fully wired with data sources and animations.

## Threat Flags
None - no new network endpoints, auth paths, or trust boundary changes.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 3D hero and card hover effects are live and build-verified
- Future phases can build on the R3F infrastructure established here
- Gallery page now uses CardHover instead of HoverEffect - subsequent gallery changes should use CardHover

---
*Phase: 04-3d-enhancements*
*Completed: 2026-07-20*

## Self-Check: PASSED
All created files verified present. All 4 commit hashes found in git log.
