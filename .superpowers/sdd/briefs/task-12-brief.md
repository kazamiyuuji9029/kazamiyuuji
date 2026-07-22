# Task 12: Final Build & Deploy

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified build ready for deployment

## Steps

### Step 1: Run full build

Run: `npm run build`
Expected: Build succeeds with no errors

### Step 2: Verify all pages render

Check build output for:
- `/` (Home)
- `/about`
- `/gallery`
- `/contact`

All should show "✓ Compiled successfully"

### Step 3: Push to main

```bash
git push origin main
```

### Step 4: Verify Vercel deployment

Wait for Vercel to auto-deploy from main. Check:
- https://goat-six-bay.vercel.app loads
- Light blue/white gradient background visible
- Glass panels clearly visible
- Bubbles floating in background
- 3D sphere renders on home page
- All 4 pages accessible

### Step 5: Final commit message

```bash
git commit --allow-empty -m "chore: verify Frutiger Aero redesign deployed to Vercel"
```
