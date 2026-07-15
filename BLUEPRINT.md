# ClearTrust — Project Blueprint

Static marketing site for ClearTrust, a Nigeria-based (pan-African positioning) primary source verification company. No build step, no framework — plain HTML/CSS/JS, meant to be easy to pick up and extend in VS Code.

## 1. Folder structure

```
cleartrust-site/
├── index.html                              Homepage — hero, mission/vision, service teasers, how-it-works, why-us, contact form
├── services.html                           Services overview — all 4 service lines, links to detail pages
├── service-primary-source-verification.html
├── service-background-screening.html
├── service-immigration-compliance.html
├── service-media-consultancy.html
├── css/
│   └── style.css                           Single shared stylesheet — all pages link to this
├── assets/
│   └── images/
│       └── logo1-transparent.png           Logo, background removed for use on dark nav/hero
└── BLUEPRINT.md                            This file
```

No `package.json`, no bundler. Open `index.html` directly in a browser, or use VS Code's "Live Server" extension for auto-reload while editing.

## 2. Sitemap

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero (background photo + logo), mission/vision, 4-service teaser grid, how-it-works, why-us, contact form |
| Services overview | `services.html` | All 4 service lines with short descriptions + "how delivery works" explainer |
| Primary Source Verification | `service-primary-source-verification.html` | Employment, education, goodstanding/CAC — direct-source checks |
| Background Screening / Verification | `service-background-screening.html` | Criminal record, birth certificate, logbook (managed applications) + digital footprint (direct source) |
| Immigration Compliance Service | `service-immigration-compliance.html` | Document verification for visa/work-permit cases — copy is intentionally general, see §5 |
| Media Consultancy | `service-media-consultancy.html` | Reputation/media advisory — copy is intentionally general, see §5 |

All pages share the same `<header>` nav and `<footer>` markup, duplicated per file (no templating system in place yet — see §6 if you want to fix that).

## 3. Design tokens (from `css/style.css`)

```css
--navy:        #0b2545   /* primary dark background */
--navy-dark:   #071a33   /* darkest background (footer, nav) */
--navy-light:  #13315c   /* hover states on navy */
--blue:        #1e9de3   /* primary accent — sampled from the logo checkmark */
--blue-light:  #5cc2f0
--blue-dark:   #127bb8
--ink:         #1c2733   /* body text */
--grey:        #5b6b7c   /* secondary text */
--line:        #e4e9ef   /* borders */
--bg:          #f7f9fb   /* light section background */
```

Font stack is system fonts only (`-apple-system, Segoe UI, Roboto...`) — no external font dependency, no CDN risk.

## 4. Service status matrix — keep this in sync with the site

This is the thing most likely to drift and cause a problem if the site is edited without care. Every service claim on the site is tagged by how it's actually delivered. If you add a new check or change how one works, update both the code **and** this table.

| Check | Status | Delivery mechanism |
|---|---|---|
| Employment verification | 🟢 Live | Direct source (contact employer/HR) |
| Education verification | 🟢 Live | Direct source (contact institution/exam body) |
| Goodstanding / CAC check | 🟢 Live | Direct source (CAC) |
| Digital & media footprint | 🟢 Live | Direct source (OSINT review) |
| Criminal record check | 🟡 Managed application | Nigeria Police Force Character Certificate — manual, not instant |
| Birth certificate verification | 🟡 Managed application | National Population Commission — manual |
| Vehicle logbook check | 🟡 Managed application | FRSC / relevant registries — manual |
| Health record verification | ⚪ In development | No established channel in-market — do not present as live |
| Credit score verification | ⚪ In development | Requires a licensed credit bureau subscription (CRC/CreditRegistry/FirstCentral) — do not offer until licensed |

Rationale: this is a trust/verification company. Overclaiming delivery capability on its own marketing site is a worse failure than a competitor doing it, because the entire value proposition is "what we tell you is verified." Resist the urge to move something from 🟡/⚪ to 🟢 just because it'd look better — only move it when the mechanism is actually real.

## 5. Known gaps / things that need your input before they're "done"

- **Contact form has no backend.** `index.html` currently builds a `mailto:` link to a personal Gmail on submit. Works for validating early demand, not for real traffic. Options: Formspree (fastest, no backend), a small serverless function (Vercel/Netlify function), or a proper backend if you're building the request-management pipeline anyway.
- **Hero background image is hotlinked**, not self-hosted — it references `images.unsplash.com` directly in `css/style.css` (`.hero` background). Fine for now (free license, no attribution required), but it's an external dependency. Download it into `assets/images/` and update the CSS `url()` reference if you want it permanent and self-hosted.
- **Immigration Compliance and Media Consultancy pages are intentionally generic.** No specifics were available on what these services actually deliver in practice, so the copy frames both as "scoped case-by-case" rather than listing fixed capabilities. Do not add specific claims (turnaround times, named processes, guarantees) until the actual service delivery is defined — otherwise this repeats the exact overclaiming problem the rest of the site is designed to avoid.
- **Business email.** Contact info across the site currently points to a personal Gmail. Swap for a dedicated business address before this goes live to real prospects.
- **Non-compete / IP question** — noted as checked and clear per your confirmation. Worth a final gut-check once you're actively signing clients, given the service taxonomy overlaps with a former employer's.

## 6. Suggested next steps (in rough priority order)

1. Wire up the contact form to something real (Formspree is the fastest path if you don't want to stand up a backend yet).
2. Get a business email + domain, replace the Gmail references site-wide.
3. Self-host the hero image and any other external assets.
4. If you want to stop duplicating the header/footer across 6 files, this is small enough to still convert to a static site generator (11ty, Astro) without much pain — worth doing before you add a 10th page, not after.
5. Once Immigration Compliance and Media Consultancy scope is real, rewrite those two pages with actual specifics.
6. Longer term: the site is just the front door. The actual verification request pipeline (intake → assignment → status tracking → report delivery) is a separate system this site should eventually connect to via that contact form / a proper request form — worth a real architecture pass when you're ready to build it, not before.
