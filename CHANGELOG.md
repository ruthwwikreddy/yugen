# Changelog

All notable changes to the Yūgen Summit 6.0 site.

## 2026-08-12 — Executive Board, study guides, and PDF previews

### Executive Board
- All 7 committee boards correctly configured: CCC, AIPPM, IP, UNHRC, UNSC, CCPCJ, DISEC.
- All 21 EB members connected to their photos from `public/ebs/`. Photos are now displayed in their original colours (the previous grayscale + black overlay was removed from `ChairCard` and `TeamCard`).
- Name correction: **Prasatti Burla -> Prasatti Burli** throughout the site (IP, Editor-in-Chief).
- DISEC Vice-Chairperson: **Rithik -> Rithvik**.
- Placeholder roles standardised: default `Chair / Vice-Chair` terminology replaced with `Chairperson / Vice Chairperson` (and `Co-Vice Chairperson` where applicable) for consistency across all live committees.

### Gallery
- Removed two unwanted images, reducing the gallery from 74 -> 72 entries. The corresponding JPG files and stale data entries pointing at them were cleaned up together.

### Study guides (Resources)
- PDFs from `public/papers/` are now wired into both the Resources section and the relevant committee pages.
- Available now: **AIPPM, IP, DISEC, UNSC, CCC**.
- **Coming soon**: UNHRC and CCPCJ — PDFs are not yet available.
- Resources page now renders each PDF with an inline preview iframe plus **Open in new tab** and **Download PDF** buttons.
- Committee detail pages render the same preview + buttons when a guide is available, and show the existing "Coming soon" pill otherwise.

### International Press
- Both IP PDFs are now displayed on `/committees/ip`:
  - Journalism Coverage Brief (`ip jounlism.pdf`)
  - Photojournalism Background Guide (`BACKGROUND GUIDE FOR IP PHOTOJOURNALISM..pdf`)
- The IP page now uses "Coverage brief" as the section heading instead of "Agenda" to match the corps' framing.

### UNSC agenda
- Agenda set to **UNSC Summit Meeting**.
- Freeze date: **30 January 1992** — Council convenes in the immediate aftermath of the Soviet Union's dissolution to address the resulting security vacuum across Eastern Europe and Central Asia, the future of nuclear stockpiles on former Soviet territory, and the framework for collective security in the post-Cold War order.

### Committee venues
- All 7 committees now have confirmed venues:
  - UNHRC — Indoor Sports Complex
  - AIPPM — Main Block Auditorium
  - CCPCJ — 12-D
  - DISEC — 12-H
  - CCC — 12-A
  - UNSC — 11-D
  - IP — 11-H
- Applied to both `YUGEN.committees` and the `DEFAULT_COMMITTEES` fallback.

### Files touched
- `src/lib/yugen.ts` — committee data, `studyGuideUrl`/`studyGuideUrls`, gallery, resources.
- `src/components/yugen/CommitteeDetailContent.tsx` — colour photo rendering, multi-PDF preview, Open/Download buttons, IP label.
- `src/components/yugen/PageLayout.tsx` — colour photo rendering, ResourceList with inline preview + Open/Download.
- `public/ebs/` — 21 new EB photos.
- `public/papers/` — 7 new study-guide PDFs.
- `public/gallery/` — 2 unwanted JPGs removed.
- `public/favicon.svg`, `public/og-image.svg` — removed (replaced by PNGs referenced in `index.html`).
