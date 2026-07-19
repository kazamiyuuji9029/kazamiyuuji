# Tech Stack Compatibility: Next.js + Tailwind CSS + Framer Motion + Three.js

**Domain:** Portfolio Website
**Researched:** 2026-07-19
**Stack Confidence:** HIGH

---

## Next.js Router Choice

### Recommendation: App Router

**Use App Router.** It is the default for new Next.js projects and the clear forward path. The Pages Router is still supported but is legacy.

#### Why App Router wins for portfolios:

| Factor | App Router | Pages Router |
|--------|-----------|--------------|
| Server Components | Built-in (default) | Not available |
| Layouts | Persistent layouts with nesting | `_app.tsx` only |
| `template.tsx` | Available for page transitions | Not available |
| SEO metadata | Built-in `generateMetadata` | Manual `<Head>` |
| Code splitting | Automatic per-route | Manual |
| Streaming/Suspense | Native | Limited |
| Future support | Active development | Maintenance only |

#### Key App Router concepts for this project:

- **Layouts (`layout.tsx`)** persist across navigations. Use for header, nav, footer. Do NOT put `AnimatePresence` here.
- **Templates (`template.tsx`)** remount on every navigation. This is where page transition animations go.
- **Server Components** are the default. Only add `"use client"` when you need browser APIs, event handlers, or React hooks.
- **Route Groups `(groupName)`** let you organize routes without affecting URLs. Use `(portfolio)` and `(about)` to separate sections.

**Source:** [Next.js File Conventions Docs](https://nextjs.org/docs/app/api-reference/file-conventions) (v16.2.10, updated 2026-06-23)

---

## Tailwind Integration

### Recommendation: Tailwind CSS v4

**Use Tailwind v4 with CSS-first configuration.** No more `tailwind.config.js` file. Configuration lives in CSS via `@theme` blocks.

#### Setup for Next.js:

```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --eslint --app --src-dir
```

Or manual setup with Tailwind v4:

```bash
npm install -D tailwindcss @tailwindcss/postcss postcss
```

**postcss.config.mjs:**
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**globals.css:**
```css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", sans-serif;
  --color-brand: oklch(0.65 0.2 250);
  --breakpoint-3xl: 120rem;
}
```

#### Key differences from v3:

| What Changed | v3 | v4 |
|---|---|---|
| Config file | `tailwind.config.js` (JS) | CSS `@theme` blocks |
| Directives | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| PostCSS plugin | `tailwindcss` | `@tailwindcss/postcss` |
| Border default | `gray-200` | `currentColor` |
| Opacity utilities | `bg-black/50` (modifiers) | Same, but removed `bg-opacity-*` |
| Custom utilities | `@layer utilities {}` | `@utility` directive |
| Hover on mobile | Applied everywhere | Wrapped in `@media (hover: hover)` |

#### Portfolio-specific Tailwind patterns:

- Use `cn()` utility (clsx + tailwind-merge) for conditional class merging
- Dark mode via `class` strategy: use CSS variables in `@theme` for dark/light tokens
- Mobile-first responsive: `sm:`, `md:`, `lg:`, `xl:` prefixes
- Use `prettier-plugin-tailwindcss` for consistent class ordering

**Source:** [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide), [Tailwind v4 Installation](https://tailwindcss.com/docs/installation/using-vite)

---

## Framer Motion Patterns

### Recommendation: Motion (framer-motion) with template.tsx

**Use `template.tsx` for page transitions, NOT `layout.tsx`.** This is the single most important pattern to get right.

#### Why template.tsx, not layout.tsx:

- `layout.tsx` persists across navigations (does not re-render)
- `template.tsx` receives a unique key per route and remounts on navigation
- `AnimatePresence` needs remounting to trigger exit animations

#### Page transition pattern:

```tsx
// app/template.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

#### AnimatePresence modes:

| Mode | Behavior | Use When |
|------|----------|----------|
| `mode="wait"` | Exit animation finishes before enter starts | Clean sequential transitions (recommended) |
| `mode="sync"` | Both animate simultaneously | Overlapping page effects |
| `mode="popLayout"` | Exiting element removed from layout flow | Complex layout shifts |

#### Layout animations for shared elements:

```tsx
// Use layoutId to morph elements between pages
<motion.div layoutId="project-title">Project Name</motion.div>
```

#### Performance optimization:

- Use `LazyMotion` + `domAnimation` instead of full `motion` import
- Import `m` (lowercase) instead of `motion` when using `LazyMotion`
- Use `useReducedMotion()` hook to respect user accessibility preferences

#### Gesture animations for portfolio cards:

```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {/* Card content */}
</motion.div>
```

#### Scroll-triggered animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

**Source:** [Motion for React Docs](https://motion.dev/motion/introduction/), [Next.js template.tsx Docs](https://nextjs.org/docs/app/api-reference/file-conventions/template)

---

## Three.js / R3F Integration

### Recommendation: React Three Fiber (R3F) + dynamic import

**Always use `next/dynamic` with `{ ssr: false }` for R3F components.** Three.js requires browser APIs (`window`, `document`, WebGL) that do not exist on the server.

#### Required packages:

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

Optional but recommended:
```bash
npm install @react-three/postprocessing  # Bloom, DOF, etc.
```

#### Critical SSR pattern:

```tsx
// app/components/Canvas3D.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

export default function Canvas3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <mesh>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
```

```tsx
// app/page.tsx
import dynamic from "next/dynamic";

const Canvas3D = dynamic(() => import("@/components/Canvas3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center">
      <p>Loading 3D scene...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <Canvas3D />
    </main>
  );
}
```

#### R3F ecosystem libraries:

| Library | Purpose | When to Use |
|---------|---------|-------------|
| `@react-three/drei` | Helpers (OrbitControls, Environment, Float, Text3D) | Almost always |
| `@react-three/postprocessing` | Bloom, DOF, glitch, vignette | Visual effects |
| `@react-three/rapier` | Physics engine | Interactive physics |
| `@react-three/cannon` | Alternative physics | Simpler physics needs |
| `zustand` | State management for R3F | Shared scene state |

#### Version compatibility:

| R3F Version | React Version | Notes |
|-------------|---------------|-------|
| v8 | React 18 | Stable |
| v9 | React 19 | Latest, uses React 19 features |

**Important:** R3F v9 pairs with React 19. Verify your Next.js version uses the correct React version before upgrading.

#### Performance patterns for R3F:

- Set `frameloop="demand"` on Canvas to render only when state changes
- Call `invalidate()` to request frames when using mutation-based controls
- Share geometries and materials across instances
- Use instancing for repeated objects (reduces draw calls below 1000)
- All `useLoader` resources are cached automatically

**Source:** [React Three Fiber Docs](https://r3f.docs.pmnd.rs/getting-started/introduction), [R3F Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

---

## Performance Considerations

### Bundle size management

This stack has significant bundle weight. Three.js alone is ~600KB gzipped. Framer Motion adds ~30KB. Tailwind is tree-shaken at build time.

#### Lazy loading strategy:

| Component | Loading Strategy | Why |
|-----------|-----------------|-----|
| 3D scenes (R3F) | `next/dynamic` with `ssr: false` | Heavy, needs browser APIs |
| Framer Motion animations | `LazyMotion` + `domAnimation` | Reduces motion bundle |
| Project cards | Server Component (no animation wrapper) | Zero client JS |
| Contact form | Dynamic import (if below fold) | Interactive, not needed immediately |

#### Code splitting checklist:

1. **3D canvas**: Always dynamic import with `ssr: false`
2. **Heavy animations**: Use `LazyMotion` provider at layout level
3. **Fonts**: Use `next/font` for zero layout shift
4. **Images**: Use `next/image` for automatic optimization
5. **Below-fold content**: Consider dynamic imports for sections not visible on load

#### Rendering strategy per page:

| Page | Rendering | Rationale |
|------|-----------|-----------|
| Home | SSG (static) | Marketing content, fast load |
| Projects list | SSG + ISR | Mostly static, revalidate periodically |
| Project detail | SSG + dynamic params | Generate at build, fallback to ISR |
| About | SSG | Static content |
| Contact | SSG + client form | Form is client, page is static |
| 3D demo | Dynamic + client | WebGL needs runtime |

#### React Server Components benefit:

Most of your portfolio pages should be Server Components. Only add `"use client"` for:
- Framer Motion animated components
- Interactive Three.js scenes
- Form handlers
- Components using `useState`, `useEffect`, `useContext`, or browser APIs

This means your static content (text, images, links) ships zero client JavaScript.

#### Core Web Vitals optimization:

- **LCP**: Use `next/image` with priority for hero images. Preload critical fonts.
- **CLS**: Use `next/font` for font loading. Use aspect ratios on images.
- **FID/INP**: Minimize client JS. Defer 3D scenes until after main content loads.
- **TTFB**: Use static generation. Deploy to edge (Vercel, Cloudflare).

**Source:** [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components), [R3F Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

---

## Project Structure

### Recommended structure for a multi-page portfolio:

```
src/
├── app/
│   ├── layout.tsx              # Root layout (header, nav, footer)
│   ├── template.tsx            # Page transition animations
│   ├── page.tsx                # Home page
│   ├── loading.tsx             # Global loading skeleton
│   ├── error.tsx               # Global error boundary
│   ├── not-found.tsx           # 404 page
│   │
│   ├── projects/
│   │   ├── page.tsx            # Projects list
│   │   └── [slug]/
│   │       └── page.tsx        # Individual project
│   │
│   ├── about/
│   │   └── page.tsx            # About page
│   │
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   │
│   └── api/
│       └── contact/
│           └── route.ts        # Contact form API endpoint
│
├── components/
│   ├── ui/                     # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   │
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── AboutContent.tsx
│   │   └── ContactForm.tsx
│   │
│   └── three/                  # 3D components (client only)
│       ├── Scene.tsx           # Main R3F Canvas wrapper
│       ├── Background.tsx      # Animated background
│       ├── ProjectModel.tsx    # 3D project showcase
│       └── effects/            # Post-processing effects
│           ├── Bloom.tsx
│           └── Float.tsx
│
├── lib/
│   ├── utils.ts                # cn() utility, helpers
│   ├── animations.ts           # Shared Framer Motion variants
│   ├── constants.ts            # Site metadata, nav links
│   └── data/
│       └── projects.ts         # Project data (or fetch from CMS)
│
├── hooks/
│   ├── useReducedMotion.ts     # Accessibility hook
│   └── useMediaQuery.ts        # Responsive hook
│
└── styles/
    └── globals.css             # Tailwind imports + @theme config
```

#### Key structural decisions:

- **`components/three/`**: Isolate all R3F code. Every component here is a client component. Keeps 3D logic separate from page logic.
- **`lib/animations.ts`**: Centralize Framer Motion variants. Shared across pages for consistency.
- **`lib/data/projects.ts`**: Portfolio data in one place. Can later swap to a CMS (Sanity, Contentful) or markdown files.
- **Route groups**: If you need different layouts for portfolio vs blog, use `(portfolio)` and `(blog)` groups.
- **`template.tsx` at root**: Handles all page transitions globally. Per-section templates can override.

**Source:** [Next.js Project Structure Docs](https://nextjs.org/docs/app/getting-started/project-structure) (v16.2.10, updated 2026-06-23)

---

## Common Pitfalls

### Critical Pitfalls

#### 1. AnimatePresence in layout.tsx (WILL NOT WORK)

**What goes wrong:** Putting `AnimatePresence` inside `layout.tsx` expecting page transition animations. Exit animations never fire.

**Why:** `layout.tsx` persists across navigations. It does not unmount. `AnimatePresence` needs its children to unmount for exit animations to work.

**Fix:** Use `template.tsx` instead. It remounts on every navigation with a unique key.

**Detection:** If your exit animation never plays, you are in `layout.tsx`. Move to `template.tsx`.

---

#### 2. Three.js / R3F without dynamic import (SSR crash)

**What goes wrong:** `ReferenceError: window is not defined` or `ReferenceError: document is not defined` at build time or server render.

**Why:** Three.js accesses `window`, `document`, and WebGL APIs directly. These do not exist on the Node.js server.

**Fix:** Always wrap R3F components with `next/dynamic` and `{ ssr: false }`.

**Detection:** Build errors mentioning `window` or `document` in Three.js stack traces.

---

#### 3. Hydration mismatch from 3D canvas

**What goes wrong:** React hydration error because the server-rendered HTML differs from client-rendered HTML. The 3D canvas produces different output on server vs client.

**Why:** R3F `<Canvas>` renders to a `<canvas>` element with WebGL content that only exists client-side.

**Fix:** `ssr: false` on dynamic import prevents server rendering entirely. The component only mounts on the client.

---

#### 4. Framer Motion bundle size bloat

**What goes wrong:** The full `framer-motion` package (~100KB+) ships to the client even if you only use simple animations.

**Why:** Default import pulls the entire library.

**Fix:** Use `LazyMotion` with `domAnimation` at the app root:
```tsx
import { LazyMotion, domAnimation } from "framer-motion";

<LazyMotion features={domAnimation}>
  {children}
</LazyMotion>
```
Then use `m` (lowercase) instead of `motion` for individual components.

---

### Moderate Pitfalls

#### 5. Tailwind v3-to-v4 migration surprises

**What goes wrong:** After upgrading, styles break silently. Border colors default to `currentColor`. Renamed utilities (`shadow-sm` is now `shadow-xs`) cause visual regressions.

**Fix:** Run `npx @tailwindcss/upgrade` for automated migration. Manually audit border color defaults and renamed utilities.

---

#### 6. R3F version mismatch with React

**What goes wrong:** R3F v8 with React 19, or R3F v9 with React 18, causes cryptic runtime errors.

**Fix:** Check compatibility matrix: R3F v8 = React 18, R3F v9 = React 19. Pin versions explicitly.

---

#### 7. Missing "use client" directive

**What goes wrong:** Component that uses `useState`, `useEffect`, or browser APIs fails in App Router because it is treated as a Server Component.

**Fix:** Add `"use client"` at the top of any component that uses client-side features. Keep as many components as possible as Server Components.

---

#### 8. useEffect re-run issues with layouts

**What goes wrong:** `useEffect` in a layout does not re-run on navigation because layouts persist.

**Fix:** Move effects that need to run on navigation to `template.tsx` (which remounts) or use `usePathname()` as a dependency.

---

### Minor Pitfalls

#### 9. Image optimization missed

**What goes wrong:** Portfolio images are large, unoptimized, and cause slow LCP.

**Fix:** Use `next/image` with `priority` for above-fold images. Set explicit `width` and `height`. Use modern formats (WebP/AVIF).

---

#### 10. Font loading layout shift

**What goes wrong:** Custom fonts cause CLS (Cumulative Layout Shift) as they load.

**Fix:** Use `next/font` which self-hosts fonts and applies `font-display: swap` automatically.

---

#### 11. Touch gesture conflicts on mobile

**What goes wrong:** Framer Motion `drag` or `whileTap` gestures conflict with browser scroll behavior on touch devices.

**Fix:** Set `touch-action: none` CSS on draggable elements. Use `useReducedMotion()` for accessibility.

---

### Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Initial setup | Wrong R3F/React version pairing | Check compatibility matrix before installing |
| Layout & navigation | AnimatePresence in wrong file | Always use template.tsx for transitions |
| 3D integration | SSR crash from missing dynamic import | Establish pattern: all 3D = dynamic + ssr:false |
| Animation system | Full framer-motion bundle imported | Set up LazyMotion provider from day one |
| Performance audit | 3D scenes blocking main content | Load 3D after hero section, use Suspense |
| Mobile optimization | Touch gesture conflicts | Test on real devices, add touch-action CSS |

---

## Compatibility Matrix

| Combination | Compatible | Notes |
|-------------|-----------|-------|
| Next.js 15+ App Router + Tailwind v4 | Yes | First-class support |
| Next.js + Framer Motion | Yes | Use template.tsx for transitions |
| Next.js + React Three Fiber | Yes | Use dynamic import with ssr: false |
| Tailwind + Framer Motion | Yes | No conflicts |
| Tailwind + Three.js (via R3F) | Yes | Tailwind styles wrapper, R3F handles canvas |
| Framer Motion + Three.js | Yes | Animate wrapper div, not canvas internals |
| All four together | Yes | Proven in production portfolio sites |

---

## Recommended Versions

| Package | Version | Reason |
|---------|---------|--------|
| `next` | 15.x | Latest stable, React 19 support |
| `react` | 19.x | Latest, pairs with R3F v9 |
| `react-dom` | 19.x | Match React version |
| `tailwindcss` | 4.x | CSS-first config, no JS config file |
| `framer-motion` | 11.x | Latest stable (now "Motion") |
| `three` | 0.17x | Latest stable Three.js |
| `@react-three/fiber` | 9.x | Pairs with React 19 |
| `@react-three/drei` | 9.x | Latest helpers |
| `typescript` | 5.x | Required for Next.js TypeScript support |

---

## Sources

- [Next.js Project Structure Docs](https://nextjs.org/docs/app/getting-started/project-structure) - v16.2.10, updated 2026-06-23
- [Next.js template.tsx Docs](https://nextjs.org/docs/app/api-reference/file-conventions/template) - v16.2.10, updated 2026-03-05
- [Next.js layout.tsx Docs](https://nextjs.org/docs/app/api-reference/file-conventions/layout) - v16.2.10, updated 2026-03-05
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) - v16.2.10
- [Next.js File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions) - v16.2.10
- [Tailwind CSS Upgrade Guide (v3 to v4)](https://tailwindcss.com/docs/upgrade-guide)
- [Tailwind CSS v4 Installation](https://tailwindcss.com/docs/installation/using-vite)
- [Motion for React Introduction](https://motion.dev/motion/introduction/)
- [React Three Fiber Introduction](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [R3F Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
