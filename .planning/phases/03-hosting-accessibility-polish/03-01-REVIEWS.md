---
phase: 03-hosting-accessibility-polish
plan: 01
review_date: "2026-07-22"
reviewers:
  - name: Claude CLI
    cli: claude
    model: claude-code
    status: success
review_count: 1
overall_verdict: APPROVE_WITH_CHANGES
consensus_summary: "Framer Motion animations ignore CSS prefers-reduced-motion — the plan's claim that A11Y-01 is 'already complete' is incorrect. Deployment lacks prerequisites and post-deploy verification is vague."
---

# Phase 3 Reviews — Hosting, Accessibility & Polish

## Consensus

**Verdict:** APPROVE_WITH_CHANGES

Phase 3 is fundamentally a deployment + verification phase. The plan covers the core flow but has one critical accessibility gap and several quality improvements needed.

### Top 3 Shared Concerns

1. **Framer Motion `useReducedMotion()` missing (CRITICAL)** — The CSS `prefers-reduced-motion` media query only covers CSS animations. Framer Motion components (`ScrollReveal`, `PageTransition`, `HoverEffect`, `CardHover`) are JS-driven and ignore the CSS query. None import `useReducedMotion()`. The plan incorrectly marks A11Y-01 as "already complete."

2. **No Vercel authentication prerequisite (HIGH)** — `npx vercel --prod` fails without `vercel login`. The plan mentions this risk but offers no setup instructions or fallback (e.g., dashboard drag-and-drop of `out/`).

3. **Vague post-deploy verification (MEDIUM)** — "Confirm all 4 pages load" lacks concrete criteria (HTTP 200, content checks, responsive breakpoints at 375px/768px/1440px).

---

## Claude CLI Review

### Finding 1 — CRITICAL

**Category:** Correctness  
**Location:** A11Y-01 claim / Accessibility check step  

The plan states "prefers-reduced-motion respected for all animations — ALREADY COMPLETE from Phase 2." This is **false**. The CSS `prefers-reduced-motion` media query in `globals.css:340` only suppresses CSS-based animations. Framer Motion (`motion.div`) is JavaScript-driven — it ignores the CSS media query entirely. None of the components (`ScrollReveal.tsx`, `PageTransition.tsx`, `HoverEffect.tsx`, `CardHover.tsx`) import or use Framer Motion's `useReducedMotion()` hook.

**Suggestion:** Either (a) add `useReducedMotion()` checks to every Framer Motion component, or (b) create a wrapper that conditionally disables `motion` animations globally.

### Finding 2 — HIGH

**Category:** Completeness  
**Location:** Implementation Steps — Step 2 (Accessibility check)  

The accessibility check step only verifies CSS `prefers-reduced-motion` exists. It does not verify that JavaScript-based animations (Framer Motion) also respect it. The verification command `grep "prefers-reduced-motion" app/globals.css` gives a false sense of completeness.

**Suggestion:** Add verification: `grep -r "motion\." components/ --include="*.tsx" | grep -v "useReducedMotion"` should return zero results.

### Finding 3 — HIGH

**Category:** Risk & Robustness  
**Location:** Deployment step  

`npx vercel --prod` requires: (1) Node.js, (2) Vercel CLI/npx, (3) Vercel account authenticated (`vercel login`). No prerequisites section exists. No fallback if CLI deploy fails.

**Suggestion:** Add prerequisites: `vercel login` must succeed. Include fallback: Vercel dashboard upload (drag-and-drop `out/` directory).

### Finding 4 — MEDIUM

**Category:** Correctness  
**Location:** Verification Commands  

Verification commands use Unix syntax (`cat`, `grep`) but project is on Windows. `cat next.config.ts | grep "export"` is fragile — greps for literal "export" which matches commented-out code too.

**Suggestion:** Use build output as verification. Verify `out/` directory existence after build instead.

### Finding 5 — MEDIUM

**Category:** Completeness  
**Location:** Files Modified  

Both `next.config.ts` and `globals.css` already have required content from Phase 2. Either no files are actually modified (unusual for "execute" phase) or actual changes needed (Framer Motion accessibility fixes) are missing.

**Suggestion:** Clarify: deployment-only (no code changes) or includes code changes (list them explicitly).

### Finding 6 — MEDIUM

**Category:** Risk & Robustness  
**Location:** Threat Model  

Missing risks: (1) bundle size might exceed Vercel Hobby limits, (2) `unoptimized: true` means no image optimization — large images hurt performance, (3) build warnings policy unclear.

**Suggestion:** Expand threat model to include bundle size, image optimization tradeoffs, and build warning policy.

### Finding 7 — LOW

**Category:** Quality  
**Location:** Success Criteria  

Mixing "already exists" items with "to be verified" items dilutes the checklist and makes it harder to track what needs attention.

**Suggestion:** Split into "Pre-conditions (verified)" and "Phase 3 verification targets."

### Finding 8 — LOW

**Category:** Dependencies & Sequencing  
**Location:** Overall structure  

No gate check verifying Phase 1 and Phase 2 are complete before starting. If Phase 2 left broken code, Phase 3 would deploy a broken site.

**Suggestion:** Add pre-flight: `npm run build` must succeed before deployment.

### Finding 9 — LOW

**Category:** Completeness  
**Location:** Post-deploy verification  

"Confirm all 4 pages load" is subjective. No concrete criteria for what "load" means.

**Suggestion:** Define: (1) each URL returns HTTP 200, (2) page title matches, (3) key content visible, (4) test at 375px, 768px, 1440px widths.

### Finding 10 — NITPICK

**Category:** Quality  
**Location:** Phase metadata  

Phase labeled "execute" type but is primarily deployment/verification. "Files Modified" field suggests code changes but actual work is build + deploy + verify.

**Suggestion:** Consider "deploy" or "verify" phase type, or note "No code changes — deployment only."

---

**Overall Assessment:** APPROVE_WITH_CHANGES

This phase plan covers the basics of deploying a static Next.js site to Vercel, but has a critical gap: the claim that `prefers-reduced-motion` is "already complete" is incorrect for Framer Motion animations. The CSS media query only covers CSS animations, not the JavaScript-driven Framer Motion components. Additionally, the plan lacks concrete prerequisites (Vercel authentication), robust verification commands, and specific post-deploy acceptance criteria.

---

*To incorporate feedback into planning:*
```
/gsd-plan-phase 3 --reviews
```
