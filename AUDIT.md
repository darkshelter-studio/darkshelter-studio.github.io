# DARKSHELTER · audit and release notes

Date: 20 November 2026. Scope: complete the original studio prototype as an explicitly labelled, public-facing digital proposal.

## Confirmed problems in the supplied original

- All image slots were placeholders.
- Demo forms displayed a success-like message without saving or sending anything.
- A camera-card selection did not reliably reach/prefill the camera request form. The rental-book hash did not scroll to the request section.
- Filters rebuilt the request form and could discard entered information.
- Club date chips changed their appearance without binding an actual session to the request.
- Rental dates and quantities lacked useful bounds and chronology checks.
- Workshop/price/availability data contained conspicuous placeholders; journal entries had no readable article pages.
- Missing Greek copy, theme controls, contact/privacy screens and a coherent booking-confirmation journey.

## Implemented fixes

- Four coordinated AI-created photographic proposals of a homemade mountain darkroom, village studio, workshop and film cameras. WebP files have smaller responsive counterparts; dimensions are reserved and below-fold images load lazily. One licensed camera reference is documented separately.
- Full bilingual pages with original-style editorial typography and imagery. Responsive navigation, selected states, accessible labels, keyboard-operable dialogs, Escape/Back behavior and light/dark backgrounds.
- Date/session binding, price calculations, participant bounds, local demo capacity updates, confirmation, cancellation and release of places. All proposed prices/dates are centrally editable.
- Rental-card prefilling, persistent form drafts across in-app navigation/language changes, format/availability filters, date-order and package validation, local demo overlap checks.
- Film processing totals, quantity bounds and conditional push/pull instructions.
- Confirmation-email preview, draft email download and calendar export with Cyprus time converted to UTC. Public copy explicitly distinguishes the demo from a real booking/email service.
- Complete studio/contact/journal/privacy/proposal screens, metadata, favicon and unmodified original-source archive.

## Verification performed

| Check | Evidence/result |
|---|---|
| JS syntax | `node --check` passes for app.js and studio-config.js |
| Translation structure | English/Greek keys match |
| Original integrity | SHA-256 matches the supplied 27,138-byte original |
| Desktop layout | Rendered at 1363px; no page overflow; 46px primary controls; original editorial headline scale preserved by user request |
| Mobile layout | Rendered inside real 390×844 and 320×844 browser frames; 16px form controls; primary action visible in the first home viewport |
| Narrow overflow regression | Found footer grid gaps overflowing 320px; fixed the mobile grid to one actual column; rechecked no horizontal overflow |
| Navigation | Main studio/service routes render; mobile menu closes on navigation; legacy form/FAQ anchors remain supported |
| Workshop booking | Selected 19 Dec 2026; saved two demo places; confirmation retained correct date, name, email and €170 total |
| Capacity/cancellation | The session showed two places left after booking; cancellation restored four places |
| Calendar file | Downloaded .ics; verified DTSTART 20261219T080000Z and DTEND 20261219T120000Z for Cyprus 10:00–14:00 |
| Email | Opened the branded confirmation preview with the correct request details and an explicit not-sent notice |
| Camera selection | Filtering to 120 and requesting its camera prefilled the medium-format camera in the form |
| Rental validation | Return date earlier than collection was invalid; 10–11 Dec at €35/day calculated €70 |
| Film totals | 35mm plus push processing calculated €10 and revealed required exposure instructions |
| Drafts and themes | A Greek-entered name survived changing to English; dark background rendered without overflow |
| Dialogs | Image lightbox opened and Escape closed it |
| Runtime errors | No application-origin errors observed in the inspected console; unrelated browser-extension noise excluded |

## Practical limits

- This is a complete proposal, not an enabled production booking backend. Demo requests live only on the same device. Cross-device inventory/booking consistency and real email delivery have not been implemented or claimed.
- No card or payment integration is enabled. Proposed sessions, rates, camera availability, contact email and hours need the studio’s approval before real use.
- Images are visual proposals, not real documentary photographs of the studio or its property.
- Mobile frames validate responsive layout. Native iPhone Safari keyboard, standalone mode and physical safe-area behavior remain unverified on a real device.
- No claim is made that every possible browser, date range, storage failure or concurrent-client case was exhaustively tested.

## Journal expansion (3 → 8 articles)

Status: implemented and tested locally; **not published or deployed** (no explicit authorization given).

**What changed**
- `app.js`: the fixed `articleIds` array and the per-language `journalCats/journalTitles/journalSummaries/articles` copy were replaced by one `ARTICLES` data array. Each entry holds id (URL slug), optional legacy id, category, title, subtitle, body paragraphs and an end-link per language, image key/crop/alt, related articles, and SEO title, description, primary and secondary phrases per language. The Journal listing and article renderer both read from it. All text is escaped with `h()` when rendered.
- Old article links keep working: `#journal/test-strip`, `#journal/first-workshop` and `#journal/film-formats` resolve to the new slugs.
- `photo()` gained an optional `{alt, zoom}` argument (existing calls behave as before). This lets existing images be cropped differently per article.
- `applySeo()` updates `document.title`, the meta description and `og:title`/`og:description` per article and restores the site defaults on every other page.
- `styles.css`: two small rules so inline article links match body text and the related list is compact.
- The article page keeps its layout. The previous "Book a workshop" button on every article was replaced by a booking sentence link on article 2 only, and short related-notes links. Article 1 and 5 link to the Darkroom page, 3 to Cameras, 6 to The Analogue Shelf.
- The old film developing service link is not provided because the Film lab page was removed earlier; article 4 has no service link.

**Articles, slugs and primary phrases**

| # | URL | Primary phrase (EN) | Primary phrase (EL) | Image |
|---|---|---|---|---|
| 1 | `#journal/what-is-a-test-strip` | how to make a test strip | δοκιμαστική λωρίδα εκτύπωσης | darkroom crop |
| 2 | `#journal/your-first-darkroom-workshop` | first darkroom workshop | workshop σκοτεινού θαλάμου | workshop crop |
| 3 | `#journal/35mm-medium-format-large-format` | 35mm vs medium format vs large format | 35mm μεσαίο μεγάλο φορμά | cameras crop |
| 4 | `#journal/what-happens-when-film-is-developed` | what happens when film is developed | εμφάνιση φιλμ | darkroom crop |
| 5 | `#journal/from-negative-to-darkroom-print` | how to make a photographic darkroom print | εκτύπωση φωτογραφίας στον σκοτεινό θάλαμο | darkroom crop |
| 6 | `#journal/choosing-your-first-roll-of-film` | best film for beginners | ποιο φιλμ για αρχάριους | cameras crop |
| 7 | `#journal/learning-to-see-the-light` | understanding light in photography | το φως στη φωτογραφία | village crop |
| 8 | `#journal/how-to-store-film-negatives` | how to store film negatives | αποθήκευση αρνητικών φιλμ | large crop |

Secondary phrases, SEO titles and descriptions are in the `ARTICLES` data (`seo` field).

**Images.** Only existing assets are used, cropped differently per article. They are illustrative proposal images and do not document the real studio. There is no dedicated image of film rolls, a developing tank, test strips or negatives in archival sleeves. Replace articles 1, 4, 5 and 8 first when real studio photographs are available.

**Indexing:** see the next section; this limitation has since been addressed.

**Verification (headless Chrome, 2026-11-22)**
- 8 cards on the Journal page in EN and EL; 3-column grid on desktop, single column on mobile; no horizontal scroll at 1280, 820 and 390 px.
- Every article opened from its card, EN and EL, at desktop, tablet and mobile widths: title, category, subtitle and body match the data; English text compared against the supplied brief paragraph by paragraph; image loads; alt text present; unique browser title, meta description and og:title; back link and back button work; two related links resolve.
- Legacy slugs, unknown slug (falls back to listing), language toggle on an article, theme toggle, and default meta restored after leaving an article all checked.
- Booking link appears only on article 2. End links to Darkroom, booking, Cameras and The Analogue Shelf navigate correctly.
- No console or page errors (the only network errors are Google Fonts requests blocked in the test sandbox).
- Regression: home, Darkroom, Cameras, Club F/65, studio, The Analogue Shelf, booking, requests, contact, privacy and preview pages load; Analogue Shelf and navigation test suites still pass.
- Not verified: real phones, and the live site (nothing deployed). Greek copy was written for naturalness but has not been reviewed by a native Greek editor.

## Journal SEO: indexable article URLs

Status: implemented and tested locally; **not published or deployed**.

**What was wrong**
- Every article lived at a hash URL (`/#journal/<id>`). Search engines drop everything after `#`, so all eight articles were one URL (the home page) to Google and could not be indexed or shown in results separately. Per-article titles and descriptions set by script on those URLs had no effect on indexing.
- The live site had no `robots.txt` and no `sitemap.xml` (both returned 404 on 2026-11-22), and the Journal was only reachable through script-rendered hash links.
- A `site:` web search for the domain returned nothing, which is consistent with the site not being indexed yet. That is not proof; only Google Search Console can confirm indexing status.

**What changed**
- `tools/generate-journal.mjs` (new, plain Node, no dependencies, run by hand) reads `ARTICLES` and `JOURNAL_SEO` from `app.js` and the page shell from `index.html`, and writes:
  - `journal/<slug>/index.html` and `el/journal/<slug>/index.html` for each of the 8 articles (16 pages), plus a hub page per language at `journal/` and `el/journal/` (18 pages in total);
  - `sitemap.xml` (19 URLs: home, 2 hubs, 16 articles, each with hreflang alternates);
  - `robots.txt` (allow all, points to the sitemap).
- Each page has: `<html lang>`, a unique title and meta description, a self-referencing canonical URL, hreflang `en`/`el`/`x-default`, Open Graph and `og:locale`, Article JSON-LD (articles only), and the full article text already in the HTML, so crawlers and browsers without scripts see the content. The same app then loads over it, so design, header, footer, theme and navigation are unchanged.
- `app.js`: the app now understands path URLs (`/journal/`, `/journal/<slug>/`, `/el/...`). The path decides the language. The language button on a path page goes to the other-language URL. Journal cards, related links and "Back to journal" now use the real URLs. Old links `/#journal/<id>` (including `test-strip`, `first-workshop`, `film-formats`) redirect to the new URL in the visitor's language. `/#journal` (the listing) and every other hash route still work. A skip-link handler keeps keyboard users on the page.
- `AGENTS.md`: release rule added: run the generator after every release or Journal change, then `--check`.

**Design decisions**
- The static pages use `<base href>` so existing relative asset paths and `#route` links keep working; clicking a main-navigation link from an article page loads the app at `/#route`.
- Generated files are committed to the repo (GitHub Pages serves them as-is); no build step is needed on the host.
- The main "Journal" navigation link still points to the hash listing (`/#journal`). Because Google cannot follow it, the hub pages are discovered through the sitemap and the article-to-hub links. Optional later step: point the nav link to `journal/`.

**Tested locally (Python static server standing in for GitHub Pages; headless Chrome)**
- HTTP: all 18 pages return 200 with `text/html`; the same paths without a trailing slash return a redirect; `index.html` variants return 200; sitemap and robots return 200; unknown slugs return 404.
- Sitemap: well-formed, 19 unique URLs, matches the generated pages, hreflang sets complete and self-consistent. Robots allows everything and lists the sitemap.
- HTML as a crawler sees it (no JavaScript): correct `lang`, canonical, hreflang reciprocity, `og:url`/`og:locale`, JSON-LD, 18 unique titles, descriptions and canonicals, full article text present, images load.
- With JavaScript: the URL language wins over a stored language preference, header and footer present, Journal highlighted in the nav, the rendered text equals the static text for all 18 pages, title and description identical to the static head, refresh keeps the page, images load, no console errors.
- Behaviour: language switch goes to the counterpart URL for all 18 pages; navigation to other pages from an article; `/#journal` cards link to real URLs and open them; related links; back link to the hub; skip link; old hash links (EN and EL) redirect correctly; `/#journal` listing still works.

**Still needs external verification (cannot be done from here)**
- After publishing: confirm the live URLs return 200 (and `/journal/<slug>` redirects to the slash version) on GitHub Pages.
- In Google Search Console: verify the property, submit `https://darkshelter-studio.github.io/sitemap.xml`, use URL Inspection on a few article URLs (live test, then "Request indexing"), and check the Pages report after a few days. Indexing is up to Google and can take days or weeks; a new, small preview site may not be indexed at all until it has links from elsewhere.
- Google Rich Results Test on one article for the Article structured data.
- Confirm Googlebot renders the pages as expected (URL Inspection → View crawled page) and that the preview-site wording is acceptable for public indexing.

## Publication status

The new organization repository was created successfully, but browser file-upload permission was declined before upload. The reviewed release was not committed or deployed to the new organization. The existing older site is separate. The ZIP is the reviewed handoff; a future authorized upload and a successful Pages deployment are still required.
