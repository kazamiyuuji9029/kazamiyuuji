# Task 5: Redesign Navigation

**Files:**
- Modify: `components/layout/Navigation.tsx`

**Interfaces:**
- Consumes: `navigationLinks` from Task 4, CSS from Task 1
- Produces: Updated navigation used in all pages

## Steps

### Step 1: Update Navigation.tsx

Replace `components/layout/Navigation.tsx` with:

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import GlassPanel from "@/components/glass/GlassPanel";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassPanel
      variant="nav"
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold gradient-primary bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Mochi
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-surface/70 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-surface/70 hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-surface/70 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </GlassPanel>
  );
}
```

### Step 2: Verify navigation renders

Run: `npm run build`
Expected: Build succeeds

### Step 3: Commit

```bash
git add components/layout/Navigation.tsx
git commit -m "feat(nav): redesign navigation with Frutiger Aero styling"
```
