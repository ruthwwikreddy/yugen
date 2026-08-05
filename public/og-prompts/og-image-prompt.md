# Yūgen Summit 6.0 — OG Image Prompt

Use this prompt with your image generator (Midjourney, Ideogram, DALL·E, Flux, etc.) to create a social-share card that matches the landing page aesthetic. Export as **1200×630 PNG**, sRGB, < 300 KB, then drop the file at `public/og-image.png` (the site already references it).

---

## Prompt

> A wide 1200×630 cinematic social-share card titled **YŪGEN 6.0**, designed to match a premium dark editorial MUN site. Background is pure black with subtle film-grain and a faint engraved grid pattern. A massive bold sans-serif "**YŪGEN**" wordmark sits centered in a heavy condensed display typeface (Anton / Druk / Knockout style), uppercase, tight tracking, off-white `#F5F5F5`. Below it, a thin warm crimson divider line (`#5D2128`) and a smaller uppercase tagline **MAKING EVERY VOICE MATTER**. In the upper-left corner, a small monogram "**Y6.0**" or emblem mark. In the lower band, three pieces of metadata in clean uppercase mono-spaced caps with muted opacity: **22–23 AUG 2026** · **DDMS AMS P. OBUL REDDY PUBLIC SCHOOL** · **HYDERABAD**. A faint oversized "Ū" glyph watermarks the background at 4% opacity. A radial mauve spotlight (`#BFADA8` at 15%) blooms from the upper right. The bottom edge has a torn-paper deckled edge in dark crimson. Mood: editorial, bold, theatrical, political, like a Vogue spread for a model UN summit — not childish, not corporate. Style: high-contrast black & warm berry accent palette, grain, no photos of people, vector/typographic poster, hyper-clean kerning, 4K detail.

> **Negative prompt:** no children, no smiling photos, no stock photos, no logos that aren't YŪGEN, no rainbow gradients, no neon colors, no glossy 3D text, no cartoonish illustration, no busy background.

---

## Color tokens (must stay in sync with the site)

| Token            | Hex       | Use                          |
| ---------------- | --------- | ---------------------------- |
| Black            | `#000000` | Background                   |
| Off-white        | `#FFFFFF` | Wordmark, body               |
| Crimson          | `#5D2128` | Divider line, torn edge      |
| Berry            | `#7E5758` | Accent                       |
| Mauve            | `#BFADA8` | Spotlight bloom              |
| Liquorice        | `#0C0304` | Deep shadow                  |
| Rooster          | `#341114` | Warm dark mid-tone           |

## Typography

Already loaded site-wide via Google Fonts:

- **Display / Wordmark** — `Anton`
- **Heading / Caps labels** — `Space Grotesk`
- **Body / Meta** — `DM Sans`

## Export specs

- **Size:** 1200 × 630 px (standard Open Graph)
- **Format:** PNG, sRGB
- **No transparency**
- **Max file size:** ~300 KB (run through `sips -s formatOptions 80` or Squoosh if needed)
- **Filename:** `og-image.png` → goes in `public/og-image.png`
