# DARKSHELTER · the digital darkroom

Complete studio concept for Grigoris's handmade analog photography darkroom in Moutoullas, Cyprus.

**Site:** https://darkshelter-studio.github.io/

## What is implemented

The original editorial layout, serif typography, paper/ink palette and restrained darkroom red are retained. The site includes film developing, printing workshops, camera rental, Club F/65, journal articles, studio information and contact. All screens have English/Greek copy and light/dark backgrounds.

The preview supports session/date selection, participant limits, price calculations, local demo requests, confirmation, cancellation, calendar (.ics) download and confirmation-email (.eml) previews. No real message, reservation or payment is sent or collected. A short preview notice stays visible; detailed disclosures are at `#preview`.

## Edit the proposal

- `studio-config.js`: proposed contact email, opening hours, film/workshop prices, dates, capacity and camera details.
- `app.js`: both languages, content and interactions.
- `styles.css`: responsive presentation.
- `darkroom*.webp`, `village*.webp`, `workshop*.webp`, `cameras*.webp`: AI-created visual proposals, ready to replace with the analog studio's real photographs.
- `reference-original.html`: the supplied original, preserved byte-for-byte.

## Run and publish

No build or dependencies are needed. Run `python3 -m http.server 8080` and open http://localhost:8080/ . GitHub Pages uses `main` at the repository root. `.nojekyll` serves the files directly.

## Before accepting real customers

Approve the proposed business details, prices, dates and imagery with Grigoris. Replace the reserved `.example` address. Connect a transactional booking backend and email provider; do not merely change `mode` to `live`. The optional `/requests` API bridge expects a persisted `booking` object. Capacity and rental conflicts must be checked transactionally on the server with idempotency, rate limiting and email retry handling. Configure the final operator, privacy and cancellation terms. Confirm hosting suitability for real commercial bookings before enabling them; this GitHub Pages publication is a studio preview.

See [AUDIT.md](AUDIT.md), [IMAGE-CREDITS.md](IMAGE-CREDITS.md) and [AGENTS.md](AGENTS.md).
