# Task 2: Create Bubbles Component

**Files:**
- Create: `components/bubbles/Bubbles.tsx`

**Interfaces:**
- Consumes: CSS `.bubble` class from Task 1
- Produces: `<Bubbles />` component used in layout

## Steps

### Step 1: Create Bubbles component

Create `components/bubbles/Bubbles.tsx`:

```tsx
"use client";

import React from "react";

interface Bubble {
  id: number;
  size: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
}

const bubbles: Bubble[] = [
  { id: 1, size: 60, left: "10%", top: "20%", duration: "6s", delay: "0s" },
  { id: 2, size: 40, left: "20%", top: "60%", duration: "8s", delay: "1s" },
  { id: 3, size: 80, left: "70%", top: "30%", duration: "7s", delay: "2s" },
  { id: 4, size: 30, left: "80%", top: "70%", duration: "9s", delay: "0.5s" },
  { id: 5, size: 50, left: "40%", top: "80%", duration: "6.5s", delay: "1.5s" },
  { id: 6, size: 35, left: "60%", top: "10%", duration: "7.5s", delay: "3s" },
  { id: 7, size: 45, left: "90%", top: "50%", duration: "8.5s", delay: "2.5s" },
  { id: 8, size: 25, left: "5%", top: "40%", duration: "5.5s", delay: "0.8s" },
];

export default function Bubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            top: bubble.top,
            "--duration": bubble.duration,
            "--delay": bubble.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
```

### Step 2: Verify component compiles

Run: `npm run build`
Expected: Build succeeds

### Step 3: Commit

```bash
git add components/bubbles/Bubbles.tsx
git commit -m "feat(components): add animated Bubbles component"
```
