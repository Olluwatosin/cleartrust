# ClearTrust — Project Blueprint

Static marketing site for ClearTrust, a Nigeria-headquartered primary source verification company operating across seventeen African countries (Nigeria, Kenya, Uganda, Ghana, Tanzania, Gambia, South Africa, Cameroon, Benin, Togo, Ethiopia, Niger, Somalia, Zimbabwe, Zambia, Senegal, Somaliland). No build step, no framework — plain HTML/CSS/JS, meant to be easy to pick up and extend in VS Code.

**Operating footprint (owner-confirmed July 2026):** the homepage presents all seventeen countries as *active* operations, not expansion targets — the "Where we operate" section (`index.html`, class `.coverage`) renders an Africa SVG map with those countries highlighted (Nigeria as home base). The country list lives both in that section's `.country-list` and in the JSON-LD `areaServed` array. If the footprint changes, update both, plus the map highlight classes (`ct-hl` / `ct-hq`) in the inline SVG. The map is derived from the simplemaps.com world map (MIT License) — the attribution comment above the inline `<svg>` must stay. Note: Somaliland is listed as an operating location but is not a separate shape in the source map (it's drawn within Somalia), so the highlighted Somalia region covers it — there are 16 highlighted shapes for 17 listed locations by design.

## 1. Folder structure

```
cleartrust/
├── index.html                              Homepage — hero, mission/vision, service teasers, how-it-works, why-us, contact form
├── services.html                           Services overview — all 4 service lines, links to detail pages
├── service-primary-source-verification.html
├── service-background-screening.html
├── service-immigration-compliance.html
├── service-media-consultancy.html
├── faq.html                                FAQ — native <details> accordion, drafted from site copy (pricing = placeholder)
├── privacy.html                            Privacy Policy — NDPA-aware draft, [PLACEHOLDER] markers to complete, noindex
├── sitemap.xml                             Lists indexable pages (privacy.html excluded)
├── robots.txt                              Allows all except /privacy.html; points to sitemap
├── css/
│   └── style.css                           Single shared stylesheet — all pages link to this
├── js/
│   └── main.js                             Shared JS — mobile menu, scroll-reveal, header-on-scroll, form AJAX, WhatsApp button
├── assets/
│   ├── fonts/
│   │   └── manrope-variable.woff2          Manrope variable font (200–800), self-hosted, latin subset
│   └── images/
│       ├── logo1-transparent.png           Logo, background removed for use on dark nav/hero
│       ├── og-image.png                    1200×630 social share preview (rendered from logo + palette)
│       ├── hero-handshake.jpg              Homepage hero background (Unsplash, self-hosted)
│       ├── primary-source-verification.jpg Service imagery — PSV card, detail page, why-us background
│       ├── background-screening.jpg        Service imagery — screening card + detail page
│       ├── immigration-travel.jpg          Service imagery — immigration card + detail page (Unsplash)
│       └── consultancy-meeting.jpg         Service imagery — media consultancy card + detail page
└── BLUEPRINT.md                            This file
```

**Absolute-URL note:** OG tags, canonical links, JSON-LD, and `sitemap.xml`/`robots.txt` all use the base URL `https://olluwatosin.github.io/cleartrust`. If you move to a custom domain, find-and-replace that base across those files.

No `package.json`, no bundler. Open `index.html` directly in a browser, or use VS Code's "Live Server" extension for auto-reload while editing.

## 2. Sitemap

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero (background photo + logo), mission/vision, 4-service teaser grid, how-it-works, why-us, contact form |
| Services overview | `services.html` | All 4 service lines with short descriptions + "how delivery works" explainer |
| Primary Source Verification | `service-primary-source-verification.html` | Employment, education, goodstanding — direct-source checks |
| Background Screening / Verification | `service-background-screening.html` | Criminal record, birth certificate, driver's licence (managed applications) + digital footprint (direct source) |
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
| Education / academic credentials | 🟢 Live | Direct source (contact institution/exam body) |
| Professional license verification | 🟢 Live | Direct source (issuing/licensing authority) — added July 2026 per owner confirmation |
| Goodstanding check | 🟢 Live | Direct source (CAC) |
| Digital & media footprint | 🟢 Live | Direct source (OSINT review) |
| Criminal record check | 🟡 Managed application | Nigeria Police Force Character Certificate — manual, not instant |
| Birth certificate verification | 🟡 Managed application | National Population Commission — manual |
| Driver's licence verification | 🟡 Managed application | FRSC (Federal Road Safety Corps) — manual |
| Health record verification | ⚪ In development | No established channel in-market — do not present as live |
| Credit score verification | ⚪ In development | Requires a licensed credit bureau subscription (CRC/CreditRegistry/FirstCentral) — do not offer until licensed |

Rationale: this is a trust/verification company. Overclaiming delivery capability on its own marketing site is a worse failure than a competitor doing it, because the entire value proposition is "what we tell you is verified." Resist the urge to move something from 🟡/⚪ to 🟢 just because it'd look better — only move it when the mechanism is actually real.

## 5. Known gaps / things that need your input before they're "done"

- ~~**Contact form has no backend.**~~ **Done (July 2026):** the form now POSTs to FormSubmit's AJAX endpoint (`https://formsubmit.co/ajax/<email>`) from `js/main.js` — no account or backend needed, includes a honeypot field, success/error states, and a `mailto:` fallback message on failure. **One-time activation required:** the first real submission triggers a confirmation email to the contact address; click the link in it to activate delivery. If you later switch to a business email, update `CONTACT_EMAIL` in `js/main.js` and re-activate.
- ~~**Hero background image is hotlinked.**~~ **Done (July 2026):** all imagery is self-hosted in `assets/images/`. The font is self-hosted too — no CDN or external requests anywhere on the site.
- **Image licensing — confirmed clear (July 2026).** `primary-source-verification.jpg`, `background-screening.jpg`, and `consultancy-meeting.jpg` are licensed (owner confirmed). `hero-handshake.jpg` and `immigration-travel.jpg` are Unsplash (free license, no attribution required). If higher-resolution versions of the licensed images are available from the license account, swapping them in would sharpen the service cards on large screens (current files are 600–1000px wide).
- **Immigration Compliance and Media Consultancy pages are intentionally generic.** No specifics were available on what these services actually deliver in practice, so the copy frames both as "scoped case-by-case" rather than listing fixed capabilities. Do not add specific claims (turnaround times, named processes, guarantees) until the actual service delivery is defined — otherwise this repeats the exact overclaiming problem the rest of the site is designed to avoid.
- **Business email.** Contact info across the site currently points to a personal Gmail. Swap for a dedicated business address before this goes live to real prospects (update it in `index.html` contact section, `CONTACT_EMAIL` in `js/main.js`, the `privacy.html` placeholders, and the JSON-LD in `index.html`).
- **WhatsApp button — built but off.** A floating click-to-chat button is wired in `js/main.js` but `WHATSAPP_NUMBER` is intentionally left blank so no button pointing at a wrong number can ship. Set it to a real number in international digits-only format (e.g. `2348012345678`) to switch it on — that's the only change needed.
- **Privacy Policy is a draft.** `privacy.html` is NDPA-aware but every `[PLACEHOLDER]` (legal name, RC number, address, retention period, data-request contact, cookies/analytics statement) must be completed, and ideally reviewed by a data-protection adviser, before relying on it with real clients. It's set to `noindex` until finished.
- **FAQ pricing placeholder.** `faq.html` has one `[PLACEHOLDER]` — the pricing answer. Everything else is drafted from real site copy.
- **Non-compete / IP question** — noted as checked and clear per your confirmation. Worth a final gut-check once you're actively signing clients, given the service taxonomy overlaps with a former employer's.

## 6. Suggested next steps (in rough priority order)

1. ~~Wire up the contact form to something real.~~ Done — FormSubmit AJAX (see §5; needs one-time email activation).
2. Get a business email + domain, replace the Gmail references site-wide.
3. ~~Self-host the hero image and any other external assets.~~ Done — images and font are all local.
4. Deploy somewhere real (GitHub Pages, Netlify, or Vercel — the repo is already on GitHub, so Pages is the shortest path). After deploying, test the share preview by pasting the URL into WhatsApp/LinkedIn, and submit `sitemap.xml` in Google Search Console.
5. If you want to stop duplicating the header/footer across 6 files, this is small enough to still convert to a static site generator (11ty, Astro) without much pain — worth doing before you add a 10th page, not after.
6. Once Immigration Compliance and Media Consultancy scope is real, rewrite those two pages with actual specifics.
7. Longer term: the site is just the front door. The actual verification request pipeline (intake → assignment → status tracking → report delivery) is a separate system this site should eventually connect to via that contact form / a proper request form — worth a real architecture pass when you're ready to build it, not before.
