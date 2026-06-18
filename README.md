# Kohinoor Polytech — Premium Polymer Engineering Website

A world-class industrial website for **Kohinoor Polytech**, a polypropylene
manufacturer specialising in PPHP, PPCP, custom compounds, colour masterbatches
and circular-economy polymer solutions.

The site combines a Tesla / Apple / Siemens aesthetic with real-time 3D,
scroll-driven storytelling, and an industrial product catalogue wired into a
unified lead-capture flow.

---

## Tech stack

- **TanStack Start v1** — full-stack React 19 framework (file-based routing,
  SSR, server functions, server routes).
- **Vite 7** as the bundler.
- **React Three Fiber + drei + three.js** for GPU-accelerated 3D
  (`ParticleField`, `GranuleSphere`).
- **Framer Motion** for scroll-linked animation, parallax and the shared
  `transformationPhase` motion value that drives the hero-to-circular-economy
  granule morph.
- **Tailwind CSS v4** + a custom OKLCH dark-mode design system declared in
  `src/styles.css`.
- **shadcn/ui** primitives (`Dialog`, `Input`, `Textarea`, `Sonner` toasts)
  for the unified lead-capture dialog.
- **Zod** for client-side input validation.
- **Cloud-ready** — wiring points are isolated in `src/lib/leads.ts`
  so swapping `localStorage` for a `createServerFn` + Supabase insert is a
  one-file change.

---

## Project structure

```
src/
  routes/                   # file-based routes (TanStack Router)
    __root.tsx              # shell: Navbar + Outlet + Footer + LeadDialog + Toaster
    index.tsx               # home: hero + 10 sections, scroll transformation
    about.tsx
    products/
      index.tsx             # filterable catalogue
      $slug.tsx             # product detail + 3D preview + inquiry CTA
    industries/
      index.tsx
      $slug.tsx             # per-industry challenge / solution / grades
    sustainability.tsx
    projects.tsx
    gallery.tsx
    blog.tsx
    contact.tsx             # full contact form (calls saveLead)
    sitemap[.]xml.ts        # server route -> /sitemap.xml
  components/
    site/
      Navbar.tsx            # glass pill nav, mega-menus, scroll progress
      Footer.tsx
      Logo.tsx
      Section.tsx           # Section / SectionHeader / GlassCard / PageHero
      LeadDialog.tsx        # global modal, listens to window event
    three/
      ParticleField.tsx     # 1.8k GPU particles + transmission crystal
      GranuleSphere.tsx     # real-time 3D material previewer
    ui/                     # shadcn primitives
  data/
    products.ts             # product catalogue + industries
  lib/
    leads.ts                # saveLead + openLeadDialog + custom event
    transformation-phase.ts # shared Framer Motion value (0..1)
  styles.css                # design tokens, glass utilities, gradients
public/
  robots.txt                # crawl rules
```

---

## Key features

### 1. Scroll-triggered granule transformation

The hero and circular-economy section are wrapped in a single
`<TransformationStage>` container. As the user scrolls, Framer Motion's
`useScroll` produces a `0..1` progress value that is written into a shared
`motionValue` exported from `src/lib/transformation-phase.ts`.

`ParticleField` reads that motion value every frame inside `useFrame` and
morphs the 3D scene through three phases:

| Phase | Range | Visual |
| --- | --- | --- |
| Waste | 0.0 – 0.5 | muted earth tint, slow rotation, scattered cloud |
| Recycling | ~0.5 | brand blue, peak rotation speed |
| Product | 0.5 – 1.0 | brand green, tighter cluster, settled motion |

Both the `pointsMaterial` color and the central transmission crystal lerp
toward the active phase colour, while the field also contracts slightly to
evoke uniform finished granules.

### 2. Unified lead-capture flow

Every "Request a quote", "Send inquiry" and product CTA across the site funnels
into one `LeadDialog`:

- A small helper, `openLeadDialog({ productName, grade, source, quantity })`,
  dispatches a `kp:open-lead-dialog` `CustomEvent`.
- `LeadDialog` (mounted once in `__root.tsx`) listens for that event,
  pre-fills product / grade / source, and shows a validated form
  (name, email, phone, company, product, grade, quantity, message).
- Submissions are validated with Zod, persisted to `localStorage` under
  `kp_leads` (capped at 200 entries), and acknowledged via a Sonner toast.
- The `/contact` form reuses the same `saveLead()` helper so every inquiry —
  whether from the hero CTA, a product page, or the contact form — lands in
  the same unified store with a `source` tag.

To wire this to a real backend, replace the body of `saveLead` in
`src/lib/leads.ts` with a `createServerFn` call or a direct server endpoint
(e.g. inserting into a `leads` table via Supabase).

### 3. SEO: sitemap.xml + robots.txt

- `src/routes/sitemap[.]xml.ts` is a TanStack Start server route that emits
  `application/xml` at `/sitemap.xml`. It enumerates every public page plus
  the full product and industry catalogues (`/products/$slug`,
  `/industries/$slug`) so crawlers can index every detail page.
- `public/robots.txt` allows all crawlers. Once a custom domain is configured,
  set `BASE_URL` in the sitemap route and optionally add a `Sitemap:` directive
  to `robots.txt`.
- Each route file defines its own `head()` with route-specific `title`,
  `description`, `og:title` and `og:description`.

### 4. Design system

`src/styles.css` defines an OKLCH dark palette with semantic tokens
(`--background`, `--foreground`, `--primary`, `--brand-blue`, `--brand-cyan`,
`--brand-green`, …), glass utilities (`.glass`, `.glass-strong`), a
`.text-gradient` headline treatment, and industrial buttons (`.btn-primary`,
`.btn-ghost`). Typography pairs **Space Grotesk** (display) with **Inter**
(body) and a numeric tabular variant.

---

## Development

```bash
bun install
bun dev
```

Routes are generated automatically from `src/routes/` into
`src/routeTree.gen.ts` — do not edit that file by hand.

### Conventions

- All colours go through the design tokens in `src/styles.css`. Avoid raw
  `bg-white` / `text-black` classes in components.
- New inquiry CTAs should call `openLeadDialog({ ... })` rather than linking
  to `/contact`, so the unified flow stays the single source of truth.
- New product or industry slugs added to `src/data/products.ts` are picked up
  automatically by the catalogue pages **and** the sitemap.

---

## Roadmap / extension points

- Swap `localStorage` lead storage for a Supabase `leads` table via
  `createServerFn`.
- Wire a real CRM (HubSpot / Zoho) webhook into the `saveLead` path.
- Add MDX-backed blog posts under `src/routes/blog/$slug.tsx` and extend the
  sitemap loader to enumerate them.
- Generate per-product `og:image` cards using the imagegen tool and attach
  them in the `head()` of `products/$slug.tsx`.