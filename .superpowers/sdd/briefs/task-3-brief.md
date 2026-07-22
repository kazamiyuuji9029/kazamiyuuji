# Task 3: Update Layout with Background

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `<Bubbles />` from Task 2, CSS from Task 1
- Produces: Updated layout wrapping all pages

## Steps

### Step 1: Update layout.tsx

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";
import Bubbles from "@/components/bubbles/Bubbles";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mochi | Game Developer",
  description: "Game developer portfolio — Frutiger Aero aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body
        className="min-h-screen font-[family-name:var(--font-body)]"
        style={{
          background: "linear-gradient(135deg, #E8F4FD 0%, #B3D9F2 50%, #FFFFFF 100%)",
        }}
      >
        <div className="light-rays" />
        <Bubbles />
        <CustomCursor />
        <SmoothScroll>
          <LazyMotion features={domAnimation}>
            {children}
          </LazyMotion>
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### Step 2: Verify layout renders

Run: `npm run build`
Expected: Build succeeds

### Step 3: Commit

```bash
git add app/layout.tsx
git commit -m "feat(layout): add light gradient background and bubbles"
```
