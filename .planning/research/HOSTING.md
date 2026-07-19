# Free Hosting & Deployment for Next.js Portfolio

**Domain:** Static/SSG portfolio website hosting
**Researched:** 2026-07-19
**Overall Confidence:** HIGH (based on official pricing pages and documentation)

---

## Hosting Comparison Table

| Criteria | Vercel (Hobby) | Netlify (Free) | Cloudflare Pages (Free) |
|---|---|---|---|
| **Bandwidth** | 100 GB/month | 300 credits (~15 GB at 20 cr/GB) | **Unlimited** |
| **Build Minutes** | Included in compute allocation | 300 credits (~30 min at 10 cr/min) | 500 min/month |
| **Builds** | Unlimited deploys | Credit-based deploys (15 cr each) | 500 builds/month |
| **Concurrent Builds** | 1 | 1 | 1 |
| **Serverless Functions** | 1M invocations, 10s timeout | Included (credit-based) | 100K req/day via Workers |
| **Edge PoPs** | ~70+ | ~100+ | **~300+ (largest)** |
| **Free Subdomain** | `*.vercel.app` | `*.netlify.app` | `*.pages.dev` |
| **Custom Domains** | Up to 50 | Unlimited | Up to 100 per project |
| **SSL/HTTPS** | Free, auto-provisioned | Free, Let's Encrypt | Free, auto-provisioned |
| **Deploy Previews** | Yes (per PR) | Yes (unlimited) | Yes (per commit/PR) |
| **Image Optimization** | 5K transforms/month | Via CDN | Via Images subproduct |
| **Framework Support** | **Next.js native** (creators) | All frameworks | All frameworks |
| **Node.js APIs** | Full (on free tier) | Full | Limited (Workers runtime) |
| **SSR Support** | Full | Via Netlify Functions | Via `@opennextjs/cloudflare` |
| **Static Export** | `output: 'export'` | `output: 'export'` | `output: 'export'` |
| **Analytics** | 50K events/month | Basic (paid for full) | Free Web Analytics |
| **Commercial Use** | **No (Hobby only)** | Yes | Yes |

### Key Takeaway

- **Best for Next.js specifically:** Vercel (native support, zero config)
- **Best free tier generosity:** Cloudflare Pages (unlimited bandwidth, commercial use allowed)
- **Best developer experience:** Netlify (forms, identity, plugin ecosystem)
- **Best raw performance:** Cloudflare Pages (300+ edge PoPs, lowest TTFB)
- **Warning:** Vercel Hobby plan is **non-commercial use only** -- cannot be used for client work or business portfolios

---

## Vercel Deep Dive

### Overview

Vercel is the company behind Next.js. Deploying a Next.js project to Vercel is the "native" path with zero configuration. The free Hobby plan is generous for personal projects.

### Free Tier (Hobby Plan) Limits

| Category | Limit |
|---|---|
| **Bandwidth** | 100 GB/month |
| **Edge Requests** | 1M/month |
| **Fast Origin Transfer** | 10 GB/month |
| **Active CPU** | 4 hours/month |
| **Provisioned Memory** | 360 GB-hrs/month |
| **Function Invocations** | 1M/month |
| **Image Transformations** | 5K/month |
| **ISR Reads** | 1M/month |
| **ISR Writes** | 200K/month |
| **Blob Storage** | 1 GB |
| **Web Analytics Events** | 50K/month |
| **Custom Domains** | 50 |
| **Team Seats** | 1 (personal use only) |
| **Serverless Timeout** | 10 seconds |

### Strengths

1. **Zero-config Next.js deployment** -- Vercel auto-detects and optimizes for Next.js features (SSR, ISR, middleware, API routes, image optimization)
2. **Automatic deployments** from every git push with preview URLs
3. **Rollback support** -- instant rollback to any previous deployment
4. **Web Analytics** built-in (privacy-friendly, lightweight)
5. **Speed Insights** for Core Web Vitals monitoring

### Limitations

1. **Non-commercial use only** on Hobby plan -- you cannot use it for business or client portfolios
2. **10-second serverless function timeout** (Pro plan gets 60s)
3. **Single team member** -- no collaboration on free plan
4. **Build minutes** are implicitly limited by the compute allocation (not a separate bucket)

### Best For

- Personal portfolio where you want maximum Next.js feature support
- Projects where you want zero configuration and automatic optimization
- Learning and experimentation

### Deployment Steps

```bash
# 1. Configure next.config.js (if using static export)
# next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Only if deploying statically elsewhere
  // images: { unoptimized: true },  // Required with output: 'export'
}
module.exports = nextConfig

# 2. Push to GitHub
git init && git add . && git commit -m "Initial"
git remote add origin https://github.com/username/portfolio.git
git push -u origin main

# 3. On vercel.com:
#    - Click "Add New..." > "Project"
#    - Import your GitHub repo
#    - Vercel auto-detects Next.js settings
#    - Click "Deploy"
#    - Live at: https://your-project.vercel.app
```

**For static export deployment elsewhere:**
```bash
# next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

# Build
npm run build
# Static files output to ./out directory
```

**Important:** If deploying to Vercel, do NOT set `output: 'export'`. Vercel natively supports all Next.js features. Static export is only needed when deploying to a host that does not run a Node.js server (Netlify, Cloudflare Pages static mode, GitHub Pages).

---

## Netlify Deep Dive

### Overview

Netlify pioneered the JAMstack hosting model. It has a mature platform with excellent DX, built-in form handling, identity/auth services, and a rich plugin ecosystem. Recently transitioned to a **credit-based pricing model**.

### Free Tier Limits (Credit-Based)

Netlify uses a credit system where different features consume credits:

| Feature | Credit Cost |
|---|---|
| **Total Credits** | 300/month (free plan) |
| **Deploys** | 15 credits each |
| **Bandwidth** | 20 credits per GB |
| **Compute (Functions)** | 10 credits per GB-hour |
| **Netlify Database** | Usage-based |

**Practical implications:**
- ~20 deploys/month if bandwidth is minimal
- ~15 GB bandwidth if no deploys
- A typical portfolio (low traffic, moderate deploys) will comfortably fit within 300 credits

### Strengths

1. **Rich ecosystem** -- built-in form handling, identity service, split testing, edge functions
2. **Deploy Previews** on every PR -- great for reviewing changes before merge
3. **Branch deploys** -- automatic deploys from feature branches
4. **Plugin marketplace** -- image optimization, security headers, Lighthouse audits
5. **Commercial use allowed** on the free plan (unlike Vercel Hobby)
6. **Credit model is flexible** -- spend credits on whatever features you use most

### Limitations

1. **Credit-based system can be confusing** -- need to track how credits are consumed
2. **Next.js support is not as native as Vercel** -- ISR, server actions, and some App Router features need workarounds
3. **300 credits/month is tight** for high-traffic or high-deploy-frequency sites
4. **No build minutes bucket** -- builds consume credits, not a separate time allocation

### Best For

- JAMstack sites with form handling needs (contact forms, newsletter signups)
- Teams wanting deploy previews and branch deploys
- Projects that need Netlify's plugin ecosystem

### Deployment Steps (Static Export)

```bash
# 1. Configure next.config.js
// next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
module.exports = nextConfig

# 2. Create netlify.toml (optional, for explicit config)
# netlify.toml
[build]
  command = "next build"
  publish = "out"

# 3. Push to GitHub
git init && git add . && git commit -m "Initial"
git push -u origin main

# 4. On netlify.com:
#    - Click "Add new site" > "Import an existing project"
#    - Connect GitHub
#    - Select repo
#    - Netlify detects next build, sets publish to "out"
#    - Click "Deploy site"
#    - Live at: https://your-site.netlify.app
```

### Deployment Steps (With Server Support -- Netlify Runtime)

Netlify also has a Next.js runtime adapter (`@netlify/next`) that supports SSR features:

```bash
# Install Netlify adapter
npm install -D @netlify/next

# No output: 'export' needed -- deploy the full Next.js app
# Netlify auto-detects and uses its runtime for SSR/ISR/API routes
```

This approach is more powerful but consumes more credits and is more complex to configure.

---

## Free Domain Options

### Platform-Provided Subdomains (Free, No Setup Required)

| Platform | Subdomain Format | Example |
|---|---|---|
| **Vercel** | `{project-name}.vercel.app` | `jane-portfolio.vercel.app` |
| **Netlify** | `{site-name}.netlify.app` | `jane-portfolio.netlify.app` |
| **Cloudflare Pages** | `{project-name}.pages.dev` | `jane-portfolio.pages.dev` |
| **GitHub Pages** | `{username}.github.io` | `janedoe.github.io` |

All of these are free, include SSL, and are immediately available after deployment. The subdomain is customizable at deploy time (within the platform's naming rules).

### Custom Domain Registration (Paid but Cheap)

If you want a professional `.com`, `.dev`, or `.io` domain:

| Registrar | Price Range | Notes |
|---|---|---|
| **Cloudflare Registrar** | ~$10-12/year for .com | At-cost pricing, no markup, recommended |
| **Porkbun** | ~$8-10/year | Often has promotions, free WHOIS privacy |
| **Namecheap** | ~$8-13/year | Free domain for first year with some hosting |
| **Google Domains** | ~$12/year | Simple, integrated with Google services |
| **Name.com** | ~$10-12/year | Straightforward pricing |

**Cloudflare Registrar** is the best value -- they sell domains at wholesale cost with no markup, plus free WHOIS privacy. This is the recommended choice if you want a custom domain for a portfolio.

### Free Domain Alternatives (No-Go)

| Service | Status | Why Avoid |
|---|---|---|
| **Freenom (.tk, .ml, .ga)** | Shut down (2023) | Sued by Meta, no longer operational |
| **FreeDNS (afraid.org)** | Active but limited | Unreliable, low trust, subdomains not real domains |
| **eu.org** | Active | Free subdomains only, not a TLD, long approval wait |

**Recommendation:** Start with a free platform subdomain (e.g., `yourname.vercel.app`). Upgrade to a custom `.com` or `.dev` domain via Cloudflare Registrar (~$10/year) when ready. Do not waste time on free TLD services.

---

## Deployment Steps for Next.js

### Option A: Full Next.js on Vercel (Recommended for Next.js)

Best when you want all Next.js features (SSR, ISR, API routes, image optimization, middleware).

**next.config.js** -- no special config needed for Vercel:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles everything natively
}
module.exports = nextConfig
```

**Steps:**
1. Push repo to GitHub
2. Go to vercel.com, import the repo
3. Click Deploy
4. Done -- Vercel auto-detects Next.js and configures everything

### Option B: Static Export to Any Host

Best for maximum portability, zero server costs, and deployment to any static host.

**next.config.js:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required: no server for image optimization
  },
  // Optional: trailing slashes for better static hosting compatibility
  trailingSlash: true,
}
module.exports = nextConfig
```

**Build and test locally:**
```bash
npm run build
# Output in ./out directory
npx serve out  # Test locally before deploying
```

**Deploy to Netlify:**
- Build command: `next build`
- Publish directory: `out`

**Deploy to Cloudflare Pages:**
- Framework preset: Next.js (static export)
- Build command: `npm run build`
- Build output directory: `out`

**Deploy to GitHub Pages:**
- Add a GitHub Actions workflow for automatic builds
- Deploy the `out` directory to the `gh-pages` branch

### Option C: Next.js with SSR on Cloudflare Pages

Uses the `@opennextjs/cloudflare` adapter for full Next.js support on Cloudflare's edge.

```bash
# Install the adapter
npm install @opennextjs/cloudflare

# Add to package.json scripts
{
  "scripts": {
    "build": "npx @opennextjs/cloudflare build",
    "preview": "npx wrangler dev",
    "deploy": "npx wrangler pages deploy"
  }
}
```

```json
// wrangler.json (project root)
{
  "name": "portfolio",
  "compatibility_date": "2024-09-25",
  "compatibility_flags": ["nodejs_compat"],
  "main": ".opennext/worker.js",
  "assets": { "directory": ".opennext/assets" }
}
```

**Limitation:** Cloudflare Workers runtime does not support all Node.js APIs. Some npm packages that depend on Node.js built-ins may not work.

---

## Performance Considerations

### Static vs. Server-Rendered on Free Tiers

| Approach | Cold Start | TTFB | Best For |
|---|---|---|---|
| **Static Export (SSG)** | None | Excellent | Portfolio with infrequent content changes |
| **ISR on Vercel** | None after first cache | Excellent | Portfolio with occasional content updates |
| **SSR on Vercel** | 200ms-2s | Good | Dynamic content (not typical for portfolio) |
| **SSR on Cloudflare Pages** | <5ms (edge) | Excellent | Dynamic content at the edge |

**For a portfolio site, static export is almost always the right choice.** There is no reason to pay the complexity cost of SSR for a site that changes infrequently.

### CDN & Edge Performance

| Platform | Edge PoPs | Typical Lighthouse Score | TTFB |
|---|---|---|---|
| **Cloudflare Pages** | 300+ | 95-100 | **Fastest** (densest edge network) |
| **Vercel** | 70+ | 95-100 | Fast (optimized for Next.js) |
| **Netlify** | 100+ | 90-98 | Fast |

### Free Tier Gotchas

1. **Vercel Hobby is non-commercial** -- if your portfolio is for a business or freelancing, you need Vercel Pro ($20/month) or a different host
2. **Netlify credit system** -- a burst of traffic or many deploys in a month can exhaust credits quickly; monitor usage
3. **Cloudflare Pages** has the most generous free tier but limited Node.js API support for SSR
4. **Image optimization** on free tiers is limited -- optimize images at build time (use Sharp or similar) rather than relying on host-level optimization
5. **Free analytics** are basic on all platforms -- consider Plausible Analytics or Umami (self-hosted) for better insights

### Optimization Checklist for Free Hosting

- [ ] Use static export (`output: 'export'`) unless you need SSR
- [ ] Optimize images at build time (compress, use WebP/AVIF)
- [ ] Enable Next.js built-in code splitting and lazy loading
- [ ] Use `next/font` for zero-layout-shift font loading
- [ ] Minimize JavaScript bundle size (check with `next build` output)
- [ ] Add proper cache headers for static assets
- [ ] Use a lightweight analytics solution (Vercel Analytics, Plausible, Umami)
- [ ] Compress assets with Brotli/gzip (all three hosts do this automatically)

---

## Recommendation

### For a Next.js Portfolio: Start with Vercel, Migrate if Needed

**Primary recommendation: Vercel (Hobby plan)**

1. **Zero configuration** for Next.js -- import your repo and deploy
2. **Full feature support** without static export workarounds
3. **Best developer experience** for Next.js specifically
4. **Generous free tier** (100 GB bandwidth, unlimited deploys)
5. **Automatic preview deployments** on every PR

**Caveat:** Vercel Hobby is **non-commercial use only**. If this portfolio is for professional/freelance work, you have two options:
- Upgrade to Vercel Pro ($20/month)
- Use **Cloudflare Pages** instead (free, commercial use allowed, unlimited bandwidth)

### Decision Matrix

| Your Situation | Recommended Host | Why |
|---|---|---|
| Personal learning portfolio | **Vercel** | Best Next.js DX, zero config |
| Freelancer/business portfolio | **Cloudflare Pages** | Free, commercial use allowed, unlimited bandwidth |
| Portfolio with contact form | **Netlify** | Built-in form handling, no backend needed |
| Maximum performance on a budget | **Cloudflare Pages** | 300+ edge PoPs, unlimited bandwidth |
| Want a custom domain cheaply | **Cloudflare Pages + Cloudflare Registrar** | Unified platform, at-cost domains (~$10/year) |

### The Pragmatic Path

1. **Build the portfolio** with `output: 'export'` (static export) for maximum portability
2. **Deploy to Vercel** first for the best DX during development
3. **Buy a `.dev` or `.com` domain** from Cloudflare Registrar (~$10/year) when ready to go live professionally
4. **Point the domain** to whichever host you choose
5. **Migrate later** if needed -- static export means your site works anywhere

---

## Sources

- [Vercel Pricing](https://vercel.com/pricing) -- Official Hobby plan limits
- [Netlify Pricing](https://www.netlify.com/pricing/) -- Credits-based free tier details
- [Cloudflare Pages Pricing](https://pages.cloudflare.com/) -- Free tier with unlimited bandwidth
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) -- Official static export documentation
- [OpenNext Cloudflare Adapter](https://opennext.js.org/cloudflare) -- Next.js on Cloudflare Pages
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) -- At-cost domain pricing
