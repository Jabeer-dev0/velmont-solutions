# Velmont Solutions — Website

Production marketing site for [Velmont Solutions](https://velmontsolutionsgroup.com). Built with **Vite**, **React 19**, and **React Router 7**, deployed on **Netlify**.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services bento, showcase, process, pricing teaser, FAQ, CTA |
| `/services` | Services index, process overview, FAQ, CTA |
| `/services/:slug` | Service detail (10 services) with scroll story hero |
| `/about` | Company story, values, architecture |
| `/pricing` | Plans, comparison table, FAQ, CTA |
| `/contact` | Contact form, reach channels, next steps |
| `/privacy` | Privacy policy |

## Quick start

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

## Deploy (Netlify)

[`netlify.toml`](netlify.toml) is configured for:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA fallback** for client-side routing

Set the Netlify **base directory** to `website` when deploying from the parent repo.

## Project structure

```
src/
├── components/
│   ├── layout/       SiteNav, SiteFooter, NavLogo
│   ├── sections/     Page sections (home, services, about, contact, pricing, privacy)
│   ├── contact/      Form fields and success state
│   ├── about/        Timeline and value card art
│   ├── seo/          SeoManager, JSON-LD
│   └── ui/           Buttons, labels, logos, badges
├── data/             Site copy, SEO, services, pricing, FAQs, schema
├── lib/              Scroll animations, nav behaviour, utilities
├── pages/            Route-level page shells
└── styles/           Design tokens + site CSS
```

Brand colours and typography are imported from [`colors_and_type.css`](../colors_and_type.css) at the repo root.

## Content and assets

- **Copy:** Centralised in `src/data/` — update site details in `site.js`, page SEO in `seo.js`.
- **Images:** Served from `public/images/`. Service detail scroll visuals use assets in `public/images/social/` and `public/images/design/`.
- **Sitemap / robots:** `public/sitemap.xml`, `public/robots.txt`.

## Contact form

The contact form validates on the client and shows a success state after submit. It does **not** send email or persist data yet. To collect submissions on Netlify, enable [Netlify Forms](https://docs.netlify.com/forms/setup/) and add `data-netlify="true"` plus a hidden `form-name` field to the form in `ContactForm.jsx`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint |

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Layout is responsive from 320px upward; primary breakpoint at 920px.

---

© Velmont Solutions Group. All rights reserved.
