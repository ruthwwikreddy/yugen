# Yūgen Summit 6.0 — Official Site

Production website for **Yugen Porps** (Yūgen Summit 6.0) at P. Obul Reddy Public School, Hyderabad.

## Stack

React 19 · Vite · TypeScript · Tailwind v4 · Framer Motion · react-router-dom

## Develop

```bash
npm install
npm run dev
npm run build
```

## Content — single source of truth

**All copy and data lives in `src/lib/yugen.ts`.** Replace `TBA` values and empty arrays when the organizing committee confirms details.

| Data | Where to update |
|------|-----------------|
| Dates, hero status | `dates`, `datesHero`, `status` |
| Stats bar | `stats` |
| About + SG letter | `about` |
| Past editions | `legacy.editions` |
| Gallery photos | `gallery[]` — `{ id, src, alt, caption }` |
| Committees | `committees[]` — enables `/committees/:id` |
| Schedule | `schedule[]` |
| Dress code | `dressCode[]` |
| Secretariat | `secretariat[]` |
| USGs + EB | `team.usgs[]`, `team.eb[]` |
| Resources / PDFs | `resources[]` or use defaults until filled |
| Delegate handbook | `delegatesGuide.sections` |
| FAQ | `faq[]` |
| Awards | `awards[]` |
| Sponsors | `sponsors[]` |
| Pricing | `pricing[]` |
| Venue / map | `venueDetail` |
| Hotels / travel | `accommodation` |
| Press kit | `press.kit[]` |
| Chair / IP apply | `apply[]` |

Empty arrays fall back to polished TBA placeholders via helpers: `getResources()`, `getAwards()`, `getPressKit()`, `getGalleryItems()`, `getPricing()`.

## Notify form

Copy `.env.example` → `.env.local` and set `VITE_FORMSPREE_ENDPOINT`.

## Routes

| Route | Page |
|-------|------|
| `/` | Home — hero, stats, about, legacy, committees, schedule, venues, dress code, secretariat, gallery, notify CTA |
| `/about` | About + letter from SG |
| `/register` | Notify + pricing tiers (TBA) |
| `/committees` | Committee listing |
| `/committees/:id` | Committee detail (when roster live) |
| `/schedule` | Full schedule |
| `/team` | Secretariat, USGs, EB |
| `/resources` | RoP, study guides, handbook PDFs |
| `/delegates` | Delegate handbook |
| `/faq` | FAQ accordion |
| `/awards` | Award categories |
| `/apply` | Chair / IP / OC applications |
| `/sponsors` | Partner logos |
| `/press` | Media kit |
| `/venue` | Campus, parking, map |
| `/accommodation` | Travel + hotels |
| `/gallery` | Photo grid |
| `/contact` | Contact + notify |
| `/privacy` `/terms` `/refund` | Legal |

## Deploy

Vercel or Cloudflare Pages → point `yugenporps.in` DNS. SPA rewrites configured in `vercel.json`.
