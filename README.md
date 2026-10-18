# Kayyem Therapy

Website for Kayyem Therapy (Allie Kayyem, LSW) — Westminster & Boulder, Colorado.
Live at **https://www.kayyemtherapy.com** via GitHub Pages (served from the `main` branch root; `CNAME` sets the custom domain).

## Stack

Plain static HTML, CSS, and a small vanilla JS file. No build step, no frameworks, no third-party fonts or icon libraries.

```
index.html            Home
about/index.html      About Allie
schedule/index.html   Scheduling (opens the Mindful Therapy Group portal in a modal)
404.html              Not-found page (GitHub Pages serves this automatically)
assets/css/site.css   Design system + all page styles
assets/js/site.js     Nav, scroll reveal, intro video, scheduler modal, contact form
assets/fonts/         Fraunces (display) + Figtree (body), self-hosted woff2
assets/img/           Optimized photos (JPEG + WebP), favicons, OG image
assets/video/         Intro video (MP4) + poster frame
robots.txt, sitemap.xml
```

## Editing

* **Copy** lives directly in the HTML files. Each page has its own header/footer, so a nav change needs to be made in all three pages (plus `404.html`).
* **Colors, fonts, spacing** are CSS custom properties at the top of `assets/css/site.css` (`:root`).
* **Scheduling link**: the Mindful Therapy Group URL appears in `schedule/index.html` (the `data-url` on `#scheduler-modal`, the "Open in a new tab" link, and the "New tab" button in the modal bar).
* **Contact form** has no backend; submitting opens the visitor's email app with a pre-filled message to kayyemtherapy@gmail.com.
* **Images**: drop new originals anywhere, then export resized JPEG + WebP variants into `assets/img/` and update the `<picture>` tags. Keep hero images under ~250 KB.

## Local preview

```
python3 -m http.server 8080
# then open http://localhost:8080
```
