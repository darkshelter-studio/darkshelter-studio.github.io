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

## Publication status

The new organization repository was created successfully, but browser file-upload permission was declined before upload. The reviewed release was not committed or deployed to the new organization. The existing older site is separate. The ZIP is the reviewed handoff; a future authorized upload and a successful Pages deployment are still required.
