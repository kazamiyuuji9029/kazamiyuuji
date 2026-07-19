# Animation & Interaction Patterns Research

**Domain:** Portfolio Website with Maximum Visual Effects
**Researched:** 2026-07-19
**Overall Confidence:** HIGH

---

## Animation Libraries Comparison

### Primary Recommendation: Framer Motion (Motion) + GSAP ScrollTrigger

For a maximum-visual-effects portfolio, no single library covers everything. The proven production stack combines **Framer Motion** for React-native declarative animations with **GSAP** for high-performance scroll-driven and timeline sequences, unified under **Lenis** for smooth scrolling.

### Library Breakdown

#### Framer Motion (now "Motion")
- **API:** Declarative, React-first (`motion.div`, `whileInView`, `animate`)
- **Bundle:** ~30KB+ (tree-shakeable with `LazyMotion`)
- **Strengths:** Layout animations, shared layout transitions, gesture support, `AnimatePresence` for enter/exit, built-in `useInView` and `useScroll` hooks, `whileInView` prop for zero-config scroll animations
- **SSR:** Excellent Next.js App Router support
- **Best for:** Page transitions, hover effects, layout morphs, component-level scroll reveals, gesture-driven interactions
- **Weakness:** Not designed for complex sequenced timelines or heavy scroll pinning/scrubbing

#### GSAP (GreenSock Animation Platform)
- **API:** Imperative/procedural (`gsap.to()`, `gsap.timeline()`, ScrollTrigger)
- **Bundle:** ~25KB core + ScrollTrigger plugin (~7KB) + optional plugins
- **Strengths:** Unmatched performance (optimized ticker), complex timeline sequencing, ScrollTrigger with scrub/pin/snap, SplitText for character reveals, Flip plugin for layout animations, cross-browser consistency
- **React Integration:** Use `@gsap/react` for `useGSAP` hook with proper cleanup via `gsap.context()`
- **Best for:** Scroll-driven storytelling, horizontal scroll sections, pinned parallax, text reveal sequences, SVG path animations, cinematic intro sequences
- **Weakness:** Imperative API fights React's declarative model; requires careful cleanup

#### React Spring
- **API:** Hook-based, physics-driven (`useSpring`, `useTrail`, `useTransition`)
- **Bundle:** ~15KB+
- **Strengths:** Physics-based spring animations feel organic and natural, lightweight, good for follow-cursor and magnetic effects
- **Best for:** Magnetic hover effects, physics-based cursor following, spring transitions
- **Weakness:** No scroll animation primitives, smaller community, slower development pace in 2025-2026

#### Lenis (by darkroom engineering)
- **What:** Smooth scrolling library (replacement for Locomotive Scroll, ScrollSmoother)
- **Bundle:** Lightweight, RAF-based
- **Strengths:** Buttery smooth scrolling, perfect GSAP ScrollTrigger integration, respects `prefers-reduced-motion`, works with Framer Motion
- **Setup:** `<ReactLenis root>` wrapper in root layout with `lerp: 0.05-0.15` for natural feel
- **Integration with GSAP:** Call `ScrollTrigger.update` on Lenis scroll event, sync via `gsap.ticker.add()`
- **Best for:** Foundation layer that makes all other scroll-based animations feel premium

#### Supporting Libraries

| Library | Purpose | When to Use |
|---------|---------|-------------|
| `@react-three/fiber` | React renderer for Three.js | Hero section 3D scenes, interactive 3D objects |
| `@react-three/drei` | R3F helpers (OrbitControls, Float, Text3D, etc.) | Accelerate 3D scene development |
| `@react-three/postprocessing` | Bloom, glitch, DOF, chromatic aberration | Cinematic 3D effects |
| `@splinetool/react-spline` | Embed Spline 3D scenes in React | Quick 3D scene creation without WebGL coding |
| `@studio-freight/lenis` | Smooth scrolling | Foundation for all scroll effects |
| `react-intersection-observer` | Lightweight IO hook | Simple scroll-triggered reveals |
| `AutoAnimate` | Zero-config micro-animations | List reordering, subtle feedback |
| `anime.js` | Lightweight JS animation engine | Simple alternative to GSAP for basic timelines |

### Quick Comparison Matrix

| Feature | Framer Motion | GSAP | React Spring | Lenis |
|---------|:---:|:---:|:---:|:---:|
| Declarative API | Excellent | No | Excellent | N/A |
| React SSR | Native | Via hooks | Native | Client-only |
| Scroll Animations | Good | Excellent | None | Foundation |
| Page Transitions | Excellent | Good | Good | N/A |
| Hover/Gesture | Excellent | Good | Excellent | N/A |
| Layout Animations | Excellent | Via Flip | None | N/A |
| Physics Springs | None | None | Excellent | None |
| Scroll Pin/Scrub | None | Excellent | None | N/A |
| Timeline Sequencing | Good | Excellent | Limited | None |
| Performance | Very Good | Excellent | Very Good | Excellent |
| Bundle Size | ~30KB | ~32KB+ | ~15KB | ~8KB |

### Recommendation

**Use all four.** They serve non-overlapping roles:
1. **Lenis** -- smooth scroll foundation (always running)
2. **Framer Motion** -- declarative page/component animations (React-native)
3. **GSAP + ScrollTrigger** -- complex scroll-driven sequences and timelines
4. **React Spring** -- physics-based micro-interactions (magnetic buttons, springy cursors)

For **3D content**, decide between:
- **React Three Fiber** (full control, code everything) for custom interactive 3D scenes
- **Spline** (visual tool, embed) for quick 3D product/object renders

---

## Parallax Techniques

### Architecture

For a multi-page portfolio, parallax operates at three levels:

1. **Global parallax layers** -- Background elements that move at different speeds relative to scroll across all pages
2. **Section-level parallax** -- Individual content sections with depth variation
3. **Component-level parallax** -- Mouse-driven parallax within cards, images, or hero elements

### Recommended Approaches

#### 1. GSAP ScrollTrigger Scrub (for scroll-linked parallax)
The gold standard for scroll-driven parallax. Ties element transform directly to scroll position with optional smoothing.

```tsx
// gsapParallax.tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxLayer({ speed = 0.5, children }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.to(ref.current, {
      y: () => speed * 200, // pixels of movement
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // smoothing factor
      },
    });
  }, { scope: ref });
  return <div ref={ref}>{children}</div>;
}
```

#### 2. Framer Motion `useScroll` + `useTransform` (for React-native parallax)
Declarative alternative that stays within React's model.

```tsx
// motionParallax.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxImage({ src, speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.img src={src} style={{ y }} />
    </div>
  );
}
```

#### 3. Mouse-Driven Parallax (for hero/interactive sections)
Elements shift based on cursor position, not scroll. Creates a 3D depth illusion.

```tsx
// mouseParallax.tsx
"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function MouseParallax({ children, intensity = 20 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ perspective: 1000 }}>
      <motion.div
        style={{
          rotateY: useTransform(x, [-1, 1], [-intensity, intensity]),
          rotateX: useTransform(y, [-1, 1], [intensity, -intensity]),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

### Multi-Page Parallax Architecture

For a Next.js multi-page portfolio with persistent parallax background:
- Use `layout.tsx` to hold a persistent background layer (parallax stars, gradient, or particles)
- Parallax background is driven by GSAP ScrollTrigger synced with Lenis
- Page content transitions via Framer Motion `AnimatePresence` while background persists
- Background elements use `position: fixed` and `will-change: transform`

### Performance Rules
- Always use `transform: translate3d()` or GSAP `x`/`y` (GPU-accelerated)
- Never animate `top`, `left`, `margin` for parallax (triggers layout reflow)
- Use `will-change: transform` only on actively animating elements
- Use Intersection Observer to pause parallax for off-screen sections
- Reduce parallax intensity on mobile (`@media (prefers-reduced-motion: reduce)`)

---

## 3D Effects

### CSS 3D Transforms (lightweight, no library)

For card tilts, hover flips, and depth layers without WebGL:

```tsx
// tiltCard.tsx
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function TiltCard({ children }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setRotateY(((e.clientX - centerX) / (rect.width / 2)) * 15);
    setRotateX(-((e.clientY - centerY) / (rect.height / 2)) * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
```

Key CSS properties for 3D:
- `perspective: 800-1200px` on parent for depth illusion
- `transform-style: preserve-3d` on parent for nested 3D
- `translateZ()` for depth offset on child layers
- `backface-visibility: hidden` for card flips
- Use `prefers-reduced-motion` to disable on accessibility request

### React Three Fiber (full WebGL 3D)

For immersive hero sections or interactive 3D objects:

```tsx
// heroScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={1.5} rotationIntensity={0.5}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshDistortMaterial
            color="#6366f1"
            distort={0.3}
            speed={2}
            roughness={0.2}
          />
        </mesh>
      </Float>
      <Environment preset="city" />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.8} />
      </EffectComposer>
    </Canvas>
  );
}
```

### Spline (visual 3D tool, no WebGL coding)

For quick 3D product renders or decorative objects:
- Create scene at spline.design
- Embed via `<Spline scene="URL" />`
- Supports mouse interaction, animations, and state triggers
- Lower barrier to entry but less control than R3F

### When to Use What

| Effect | Tool | Reason |
|--------|------|--------|
| Card tilt on hover | CSS 3D + Framer Motion | No WebGL overhead |
| 3D card flip | CSS 3D transforms | Simple, performant |
| Interactive 3D hero | React Three Fiber | Full control, custom shaders |
| 3D product model | Spline embed or R3F | Quick if Spline, custom if R3F |
| Particle systems | R3F or Three.js | Requires WebGL |
| Depth parallax layers | CSS `translateZ` | No library needed |

---

## Page Transitions

### Architecture

Next.js App Router complicates page transitions because layouts persist across navigations. The standard pattern uses Framer Motion's `AnimatePresence` keyed on pathname.

### Implementation Pattern

```tsx
// app/layout.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(4px)" },
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        {/* Persistent navigation here */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
```

### Key Rules
- Always use `mode="wait"` so exit animation completes before enter starts
- `key={pathname}` triggers AnimatePresence to animate old route out and new route in
- Mark layout component as `"use client"`
- Wrap only `{children}`, not the full layout, in `motion.div`
- Re-initialize Lenis or scroll position on route change

### Advanced Transition Patterns

#### Staggered Page Transition
```tsx
// staggerTransition.tsx
const container = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const item = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
```

#### Curtain/Wipe Transition
Using CSS clip-path animated via GSAP or Framer Motion for dramatic reveals:
```tsx
<motion.div
  initial={{ clipPath: "inset(0 0 100% 0)" }}
  animate={{ clipPath: "inset(0 0 0% 0)" }}
  exit={{ clipPath: "inset(100% 0 0 0)" }}
  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
>
  {children}
</motion.div>
```

#### Hero-to-Page Morph
Shared layout animation where a project card morphs into the full project page using Framer Motion's `layoutId`:
```tsx
// On the card:
<motion.div layoutId="project-hero">...</motion.div>

// On the detail page:
<motion.div layoutId="project-hero">...</motion.div>
```

### View Transitions API (emerging)
Chrome's native View Transitions API offers CSS-based page transitions without JS animation libraries. Still maturing (2025-2026) but worth monitoring as a future lightweight alternative.

---

## Scroll Animations

### Strategy: Layered Approach

Combine Intersection Observer for triggering with Framer Motion or GSAP for animation.

### Level 1: Simple Scroll Reveals (Framer Motion `whileInView`)

For most UI elements, this is all you need:
```tsx
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  <ProjectCard />
</motion.div>
```

### Level 2: Staggered Grid Reveals
```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {projects.map((p) => (
    <motion.div key={p.id} variants={item}>
      <ProjectCard project={p} />
    </motion.div>
  ))}
</motion.div>
```

### Level 3: GSAP ScrollTrigger Advanced Sequences

For cinematic scroll-driven experiences (horizontal scroll, pinned sections, text reveals):

```tsx
// scrollSequence.tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // Club plugin

gsap.registerPlugin(ScrollTrigger, SplitText);

export function ScrollRevealSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Pin the section during animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // how long the pin lasts
        pin: true,
        scrub: 1,
      },
    });

    // Text character reveal
    const split = new SplitText(".reveal-text", { type: "chars" });
    tl.from(split.chars, { opacity: 0, y: 50, stagger: 0.02 });

    // Image scale-in
    tl.from(".hero-image", { scale: 1.3, opacity: 0, duration: 1 }, "<");

    // Color wash transition
    tl.to(containerRef.current, { backgroundColor: "#1a1a2e" }, 0.5);
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <h2 className="reveal-text">Scroll to explore</h2>
      <img className="hero-image" src="/project-hero.jpg" />
    </div>
  );
}
```

### Level 4: Horizontal Scroll Section

Common in award-winning portfolios:
```tsx
useGSAP(() => {
  const sections = gsap.utils.toArray(".horizontal-section");
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth,
    },
  });
});
```

### Scroll Animation Best Practices

| Rule | Why |
|------|-----|
| Use `viewport={{ once: true }}` for content reveals | Animating on every scroll past is annoying |
| Use `margin: "-100px"` on viewport | Trigger slightly before element enters view |
| Stagger children by 80-120ms | Creates natural cascade without feeling slow |
| Use `ease: [0.22, 1, 0.36, 1]` (easeOutExpo) | Snappy start, smooth deceleration |
| Combine opacity + transform | Pure opacity is boring; add y/translate for depth |
| Pin sparingly | Pinned sections consume vertical scroll space and can confuse users |
| Clean up GSAP contexts in useEffect return | Prevents memory leaks in React |

---

## Cursor Effects

### Architecture

Custom cursors require hiding the default cursor and tracking mouse position. Framer Motion + React Spring handle the animation layer; a global context provides mouse coordinates.

### Global Mouse State Provider

```tsx
// cursor-provider.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorContext = createContext({ x: 0, y: 0 });

export function CursorProvider({ children }) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring following
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <CursorContext.Provider value={{ x: springX, y: springY, cursorX, cursorY }}>
      <CustomCursor />
      {children}
    </CursorContext.Provider>
  );
}
```

### Custom Cursor Component

```tsx
// custom-cursor.tsx
"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export function CustomCursor() {
  const [variant, setVariant] = useState("default"); // default | pointer | text | magnetic
  const size = useMotionValue(40);
  const sizeSpring = useSpring(size, { stiffness: 200, damping: 20 });

  const variants = {
    default: { width: 40, height: 40, backgroundColor: "transparent", border: "1px solid white" },
    pointer: { width: 80, height: 80, backgroundColor: "rgba(255,255,255,0.1)" },
    text: { width: 120, height: 40, backgroundColor: "rgba(255,255,255,0.15)", mixBlendMode: "difference" },
    magnetic: { width: 60, height: 60, backgroundColor: "rgba(99,102,241,0.3)", scale: 1.5 },
  };

  return (
    <>
      {/* Outer ring - follows with lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          borderRadius: "50%",
          ...variants[variant],
        }}
        animate={variants[variant]}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      {/* Inner dot - follows exactly */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
```

### Cursor Effect Types

| Effect | Description | Implementation |
|--------|-------------|----------------|
| **Magnetic buttons** | Cursor element gravitates toward button center on hover | Calculate offset from element center, animate with spring physics |
| **Blend mode difference** | Cursor inverts color behind it | `mix-blend-mode: difference` on cursor element |
| **Scale on hover** | Grows when over interactive elements | Framer Motion `variants` based on hover state |
| **Text cursor** | Expands to reveal text or changes shape | Transition width/height via spring animation |
| **Trail/particle** | Dots or particles follow cursor path | Array of recent positions, fade out with opacity |
| **Parallax cursor** | Background elements shift based on cursor position | Map cursor coords to background transform values |

### Magnetic Button Pattern

```tsx
// magneticButton.tsx
"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

### Performance Considerations
- Hide default cursor via `cursor: none` on `body`
- Use `pointer-events: none` on cursor elements so they do not intercept clicks
- Position cursor via `transform` (GPU composited), not `top`/`left`
- Throttle mousemove on mobile (touch events are less frequent anyway)
- Disable on touch devices entirely: `const isTouchDevice = 'ontouchstart' in window`
- Respect `prefers-reduced-motion` -- disable or simplify cursor effects

---

## Recommended Stack

### Tier 1: Core Animation Foundation

| Package | Version | Role |
|---------|---------|------|
| `framer-motion` (or `motion`) | latest | Declarative React animations, page transitions, scroll reveals, gestures |
| `@gsap/react` | latest | GSAP React integration with `useGSAP` hook and proper cleanup |
| `gsap` | v3.12+ | Timeline sequences, ScrollTrigger, SplitText |
| `@studio-freight/lenis` | latest | Smooth scrolling foundation |

### Tier 2: 3D (Choose One)

| Option | Packages | When |
|--------|----------|------|
| **Code 3D** | `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` | Custom interactive 3D scenes, full control |
| **Embed 3D** | `@splinetool/react-spline` | Quick 3D objects without WebGL coding |

### Tier 3: Supporting

| Package | Purpose |
|---------|---------|
| `react-intersection-observer` | Lightweight IO for simple visibility detection |
| `react-spring` (optional) | Physics-based spring effects for magnetic/cursor interactions |

### Installation

```bash
# Core animation stack
npm install framer-motion gsap @gsap/react @studio-freight/lenis

# If using React Three Fiber for 3D
npm install @react-three/fiber @react-three/drei @react-three/postprocessing three

# If using Spline for 3D
npm install @splinetool/react-spline

# Optional: physics-based springs
npm install react-spring @react-spring/web
```

### Integration Architecture

```
app/layout.tsx
  |-- SmoothScroll (Lenis wrapper)
  |     |-- AnimatePresence (Framer Motion page transitions)
  |           |-- motion.div (page wrapper, keyed on pathname)
  |                 |-- {children}
  |-- CursorProvider (custom cursor context + component)
  |-- Navigation (persistent, Framer Motion animated)
```

Scroll-triggered animations live in individual page/section components using either Framer Motion `whileInView` (simple) or GSAP ScrollTrigger (complex). The Lenis smooth scroll layer ensures all scroll-based effects feel premium.

---

## Sources

- Framer Motion (Motion) official docs: https://www.framer.com/motion/
- GSAP + React guide: https://gsap.com/resources/React/
- GSAP ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Lenis documentation: https://lenis.darkroom.engineering
- Lenis GitHub: https://github.com/darkroomengineering/lenis
- React Three Fiber (pmndrs): https://docs.pmnd.rs/react-three-fiber/
- Spline React docs: https://docs.spline.design/
- react-intersection-observer: https://github.com/thebuilder/react-intersection-observer
- Next.js App Router routing docs: https://nextjs.org/docs/app/building-your-application/routing
