# ClearTrust

Marketing site for **ClearTrust**, a Nigeria-based primary source verification company serving clients across Africa.

**Live:**
- Vercel — https://cleartrust.vercel.app
- GitHub Pages — https://olluwatosin.github.io/cleartrust/

## Stack

Static HTML/CSS/JS — no build step, no framework. Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 5500
```

Then visit http://localhost:5500.

## Structure

- `index.html` — homepage (hero, mission/vision, services, how-it-works, why-us, contact)
- `services.html` + `service-*.html` — services overview and four detail pages
- `faq.html`, `privacy.html` — FAQ and privacy policy
- `css/style.css` — single shared stylesheet
- `js/main.js` — mobile nav, scroll animations, contact-form submission, WhatsApp button
- `assets/` — self-hosted fonts and images (no external requests)

See [`BLUEPRINT.md`](BLUEPRINT.md) for the full project guide, service status matrix, and open tasks.

## Deployment

Pushes to `main` deploy automatically to both Vercel and GitHub Pages.
