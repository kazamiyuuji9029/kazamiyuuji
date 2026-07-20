# Phase 2: Content Pages & Animations - Research

**Researched:** 2026-07-20
**Domain:** Framer Motion + Lenis + Next.js App Router
**Confidence:** HIGH

---

## Framer Motion (Motion) v11+ with Next.js App Router

### Installation
```bash
npm install framer-motion
```

### Page Transitions with AnimatePresence
**Pattern:** Use `app/template.tsx` (not layout.tsx) for page transitions.

```tsx
// app/template.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Critical:** `template.tsx` is NOT the same as `layout.tsx`. Template creates a new instance for each child on navigation, enabling exit animations. Layout persists.

### Scroll-Triggered Reveals (whileInView)
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Hover Effects
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  {children}
</motion.div>
```

### LazyMotion (Bundle Optimization)
```tsx
// app/layout.tsx
import { LazyMotion, domAnimation } from "framer-motion";

<LazyMotion features={domAnimation}>
  {children}
</LazyMotion>
```

**Note:** With `domAnimation`, you get ~25KB instead of ~30KB+. Only loads the features you actually use.

### Framer Motion + Static Export
**Compatibility:** Framer Motion works perfectly with `output: 'export'`. All animations are client-side, no server rendering required. AnimatePresence exit animations work because they run in the browser after hydration.

---

## Lenis Smooth Scrolling

### Installation
```bash
npm install lenis
```

### Integration Pattern
```tsx
// components/layout/SmoothScroll.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

### Integration in Layout
```tsx
// app/layout.tsx
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### Lenis + Framer Motion ScrollTrigger
For scroll-triggered animations (Phase 3 with GSAP), Lenis provides `scroll` events that integrate with ScrollTrigger:

```tsx
import { useEffect } from "react";
import Lenis from "lenis";

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

---

## Custom Cursor

### Pattern
```tsx
"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Small dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "white",
          transition: "transform 0.1s",
          transform: isHovering ? "scale(2)" : "scale(1)",
        }}
      />
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.5)",
          transition: "transform 0.15s ease-out, width 0.2s, height 0.2s",
          transform: isHovering ? "scale(1.5)" : "scale(1)",
        }}
      />
    </>
  );
}
```

---

## Skeleton Loading States

### Pattern (CSS-only, no library)
```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Placeholder Images

### Picsum Photos (Free)
- **URL pattern:** `https://picsum.photos/seed/{seed}/{width}/{height}`
- **No API key required**
- **Consistent:** Same seed = same image (deterministic)
- **Usage in Next.js:** Use `<img>` tag (not `next/image` for external URLs in static export)

### Alternative: Unsplash Source
- `https://source.unsplash.com/{width}x{height}/?{keyword}`
- Less reliable (redirects, rate limits)

---

## Compatibility Notes

| Feature | Static Export | SSR | Client Components |
|---------|:---:|:---:|:---:|
| Framer Motion | ✅ | ✅ | ✅ |
| Lenis | ✅ | ✅ | ✅ |
| AnimatePresence | ✅ | ✅ | ✅ |
| Custom Cursor | ✅ | ✅ | ✅ |
| LazyMotion | ✅ | ✅ | ✅ |

**All features in this phase are fully compatible with `output: 'export'`.**

---

## Sources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Motion for React](https://motion.dev/)
- [Lenis Documentation](https://lenis.darkroom.engineering)
- [Next.js template.tsx](https://nextjs.org/docs/app/api-reference/file-conventions/template)
- [Picsum Photos](https://picsum.photos/)
