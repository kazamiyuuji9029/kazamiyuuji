# Task 11: Update Footer

**Files:**
- Modify: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `siteMetadata` from Task 4
- Produces: Footer component

## Steps

### Step 1: Update Footer

Replace `components/layout/Footer.tsx` with:

```tsx
import React from "react";
import { siteMetadata } from "@/lib/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center">
      <p className="text-sm text-surface/50">
        &copy; {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
      </p>
    </footer>
  );
}
```

### Step 2: Verify footer renders

Run: `npm run build`
Expected: Build succeeds

### Step 3: Commit

```bash
git add components/layout/Footer.tsx
git commit -m "feat(footer): update footer with Mochi branding"
```
