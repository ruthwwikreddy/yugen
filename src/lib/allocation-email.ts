import { YUGEN, YUGEN_LOGO, YUGEN_SEO } from './yugen'

export type AllocationEmailData = {
  delegateName: string
  delegateEmail: string
  committee: string
  country?: string
  notes?: string
  registrationId: string
  school: string
}

export type AllocationEmailTheme = 'light' | 'dark' | 'auto'

export type AllocationEmailOptions = {
  /** Force light/dark for preview; `auto` uses prefers-color-scheme in the HTML */
  theme?: AllocationEmailTheme
  /** Base URL for logo assets — defaults to YUGEN_SEO.siteUrl */
  logoBaseUrl?: string
}

const LIGHT = {
  pageBg: '#F5F5F5',
  cardBg: '#FFFFFF',
  cardBorder: '#E5E5E5',
  headerBg: '#FAFAFA',
  headerBorder: '#E5E5E5',
  text: '#333333',
  textStrong: '#111111',
  muted: '#555555',
  dim: '#777777',
  label: '#888888',
  accentBg: '#111111',
  accentText: '#FFFFFF',
  accentBorder: '#111111',
  detailBg: '#F8F8F8',
  detailBorder: '#E5E5E5',
  divider: '#EEEEEE',
  link: '#111111',
  logo: YUGEN_LOGO.emailLight,
} as const

const DARK = {
  pageBg: '#0A0A0A',
  cardBg: '#141414',
  cardBorder: '#2A2A2A',
  headerBg: '#111111',
  headerBorder: '#2A2A2A',
  text: '#E5E5E5',
  textStrong: '#F5F5F5',
  muted: '#CCCCCC',
  dim: '#AAAAAA',
  label: '#999999',
  accentBg: '#1A1A1A',
  accentText: '#F5F5F5',
  accentBorder: '#3A3A3A',
  detailBg: '#1A1A1A',
  detailBorder: '#2A2A2A',
  divider: '#252525',
  link: '#E5E5E5',
  logo: YUGEN_LOGO.emailDark,
} as const

type ThemeTokens = typeof LIGHT | typeof DARK

function getLogoUrl(baseUrl: string, theme: ThemeTokens): string {
  const base = baseUrl.replace(/\/$/, '')
  return `${base}/${theme.logo}`
}

function themeStyles(t: ThemeTokens) {
  return {
    body: `margin:0;padding:0;background-color:${t.pageBg};color:${t.text};font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;`,
    outer: `background-color:${t.pageBg};`,
    card: `max-width:600px;width:100%;border:1px solid ${t.cardBorder};border-radius:16px;overflow:hidden;background-color:${t.cardBg};`,
    header: `padding:32px 32px 28px;background-color:${t.headerBg};border-bottom:1px solid ${t.headerBorder};text-align:center;`,
    edition: `margin:16px 0 0;font-size:10px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${t.label};`,
    title: `margin:8px 0 0;font-family:Impact,'Arial Black',Helvetica,sans-serif;font-size:26px;font-weight:400;letter-spacing:0.04em;text-transform:uppercase;color:${t.textStrong};line-height:1.15;`,
    tagline: `margin:6px 0 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${t.dim};`,
    bodyCell: `padding:32px;background-color:${t.cardBg};`,
    greeting: `margin:0 0 16px;font-size:15px;line-height:1.65;color:${t.text};`,
    intro: `margin:0 0 28px;font-size:15px;line-height:1.65;color:${t.muted};`,
    committeeBox: `border:1px solid ${t.accentBorder};border-left:4px solid ${t.accentBorder};border-radius:12px;background-color:${t.detailBg};`,
    committeeInner: `padding:24px;`,
    committeeLabel: `margin:0 0 8px;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${t.label};`,
    committeeName: `margin:0;font-size:22px;font-weight:700;color:${t.textStrong};line-height:1.3;`,
    detailLabel: `display:block;margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${t.label};`,
    detailValue: `display:block;margin:0;font-size:15px;font-weight:600;color:${t.textStrong};line-height:1.4;`,
    detailValueMono: `display:block;margin:0;font-size:13px;font-weight:600;color:${t.textStrong};font-family:ui-monospace,SFMono-Regular,Consolas,monospace;line-height:1.4;`,
    detailValueMuted: `display:block;margin:0;font-size:14px;line-height:1.55;color:${t.text};`,
    detailRow: `padding:16px 0;border-bottom:1px solid ${t.divider};`,
    detailRowLast: `padding:16px 0 0;border-bottom:none;`,
    stepsLabel: `margin:0 0 12px;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${t.label};`,
    stepsList: `margin:0 0 28px;padding:0 0 0 20px;font-size:14px;line-height:1.75;color:${t.muted};`,
    stepsItem: `margin:0 0 6px;color:${t.muted};`,
    eventBox: `border-radius:10px;border:1px solid ${t.divider};background-color:${t.detailBg};padding:18px 20px;`,
    eventText: `margin:0;font-size:13px;line-height:1.65;color:${t.dim};`,
    footer: `padding:24px 32px 32px;border-top:1px solid ${t.divider};background-color:${t.cardBg};text-align:center;`,
    footerName: `margin:0 0 6px;font-size:13px;font-weight:600;color:${t.textStrong};`,
    footerLink: `margin:0 0 4px;font-size:13px;color:${t.muted};`,
    footerSocial: `margin:8px 0 0;font-size:12px;color:${t.dim};`,
    footerTagline: `margin:14px 0 0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${t.label};`,
    link: `color:${t.link};text-decoration:none;`,
  }
}

function buildDetailRow(
  label: string,
  value: string,
  styles: ReturnType<typeof themeStyles>,
  opts?: { mono?: boolean; muted?: boolean; last?: boolean },
): string {
  const valueStyle = opts?.mono
    ? styles.detailValueMono
    : opts?.muted
      ? styles.detailValueMuted
      : styles.detailValue
  const rowStyle = opts?.last ? styles.detailRowLast : styles.detailRow
  return `<tr>
    <td style="${rowStyle}">
      <span style="${styles.detailLabel}">${escapeHtml(label)}</span>
      <span style="${valueStyle}">${escapeHtml(value)}</span>
    </td>
  </tr>`
}

function buildThemedBody(data: AllocationEmailData, theme: ThemeTokens, logoUrl: string): string {
  const s = themeStyles(theme)

  const detailRows = [
    data.country ? buildDetailRow('Country / Portfolio', data.country, s) : '',
    buildDetailRow('Registration ID', data.registrationId, s, { mono: true }),
    buildDetailRow('School', data.school, s, { last: !data.notes }),
    data.notes ? buildDetailRow('Notes', data.notes, s, { muted: true, last: true }) : '',
  ]
    .filter(Boolean)
    .join('')

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="${s.outer}">
  <tr>
    <td align="center" style="padding:32px 16px 48px;background-color:${theme.pageBg};">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="${s.card}">
        <tr>
          <td style="${s.header}">
            <img src="${logoUrl}" alt="${escapeHtml(YUGEN.shortName)}" width="56" height="56" style="display:block;margin:0 auto;width:56px;height:56px;border:0;outline:none;"/>
            <p style="${s.edition}">${escapeHtml(YUGEN.shortName)} Summit · Edition ${escapeHtml(YUGEN.edition)}</p>
            <h1 style="${s.title}">Committee Allocation</h1>
            <p style="${s.tagline}">${escapeHtml(YUGEN.tagline)}</p>
          </td>
        </tr>
        <tr>
          <td style="${s.bodyCell}">
            <p style="${s.greeting}">Dear <strong style="color:${theme.textStrong};font-weight:600;">${escapeHtml(data.delegateName)}</strong>,</p>
            <p style="${s.intro}">Congratulations — we are pleased to confirm your committee allocation for <strong style="color:${theme.textStrong};font-weight:600;">${escapeHtml(YUGEN.name)}</strong>.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;${s.committeeBox}">
              <tr>
                <td style="${s.committeeInner}">
                  <p style="${s.committeeLabel}">Your committee</p>
                  <p style="${s.committeeName}">${escapeHtml(data.committee)}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
              ${detailRows}
            </table>
            <p style="${s.stepsLabel}">Next steps</p>
            <ul style="${s.stepsList}">
              <li style="${s.stepsItem}">Review your committee study guide on our website</li>
              <li style="${s.stepsItem}">Prepare position papers per committee guidelines</li>
              <li style="${s.stepsItem}">Watch for further updates from the secretariat</li>
            </ul>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="${s.eventBox}">
              <tr>
                <td>
                  <p style="${s.eventText}"><strong style="color:${theme.textStrong};font-weight:600;">${escapeHtml(YUGEN.datesHero)}</strong><br/>${escapeHtml(YUGEN.venue)}, ${escapeHtml(YUGEN.city)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="${s.footer}">
            <p style="${s.footerName}">Yūgen Summit Secretariat</p>
            <p style="${s.footerLink}"><a href="mailto:${YUGEN.email}" style="${s.link}">${escapeHtml(YUGEN.email)}</a></p>
            <p style="${s.footerSocial}">
              <a href="${YUGEN.social.instagramUrl}" style="${s.link}">${escapeHtml(YUGEN.social.instagram)}</a>
              · ${escapeHtml(YUGEN.venueShort)}, ${escapeHtml(YUGEN.city)}
            </p>
            <p style="${s.footerTagline}">${escapeHtml(YUGEN.tagline)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

function buildAutoThemeStyles(): string {
  const l = themeStyles(LIGHT)
  const d = themeStyles(DARK)

  const darkOverrides = `
      .email-body { ${d.body} }
      .email-outer { ${d.outer} }
      .email-outer > tbody > tr > td { background-color:${DARK.pageBg} !important; }
      .email-card { ${d.card} }
      .email-header { ${d.header} }
      .email-body-cell { ${d.bodyCell} }
      .email-logo-light { display:none !important; max-height:0 !important; overflow:hidden !important; }
      .email-logo-dark { display:block !important; max-height:none !important; }
      .email-edition { ${d.edition} }
      .email-title { ${d.title} }
      .email-tagline { ${d.tagline} }
      .email-greeting { ${d.greeting} }
      .email-intro { ${d.intro} }
      .email-committee-box { ${d.committeeBox} }
      .email-committee-inner { ${d.committeeInner} }
      .email-committee-label { ${d.committeeLabel} }
      .email-committee-name { ${d.committeeName} }
      .email-detail-label { ${d.detailLabel} }
      .email-detail-value { ${d.detailValue} }
      .email-detail-mono { ${d.detailValueMono} }
      .email-detail-muted { ${d.detailValueMuted} }
      .email-detail-row { ${d.detailRow} }
      .email-detail-row-last { ${d.detailRowLast} }
      .email-steps-label { ${d.stepsLabel} }
      .email-steps-list { ${d.stepsList} }
      .email-steps-item { ${d.stepsItem} }
      .email-event-box { ${d.eventBox} }
      .email-event-text { ${d.eventText} }
      .email-footer { ${d.footer} }
      .email-footer-name { ${d.footerName} }
      .email-footer-link { ${d.footerLink} }
      .email-footer-social { ${d.footerSocial} }
      .email-footer-tagline { ${d.footerTagline} }
      .email-text-strong { color:${DARK.textStrong} !important; }
      .email-link { color:${DARK.link} !important; }
  `.trim()

  return `
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    .email-body { ${l.body} }
    .email-outer { ${l.outer} }
    .email-outer > tbody > tr > td { background-color:${LIGHT.pageBg}; }
    .email-card { ${l.card} }
    .email-header { ${l.header} }
    .email-body-cell { ${l.bodyCell} }
    .email-logo-light { display:block !important; max-height:none !important; }
    .email-logo-dark { display:none !important; max-height:0 !important; overflow:hidden !important; }
    .email-edition { ${l.edition} }
    .email-title { ${l.title} }
    .email-tagline { ${l.tagline} }
    .email-greeting { ${l.greeting} }
    .email-intro { ${l.intro} }
    .email-committee-box { margin-bottom:28px;${l.committeeBox} }
    .email-committee-inner { ${l.committeeInner} }
    .email-committee-label { ${l.committeeLabel} }
    .email-committee-name { ${l.committeeName} }
    .email-detail-label { ${l.detailLabel} }
    .email-detail-value { ${l.detailValue} }
    .email-detail-mono { ${l.detailValueMono} }
    .email-detail-muted { ${l.detailValueMuted} }
    .email-detail-row { ${l.detailRow} }
    .email-detail-row-last { ${l.detailRowLast} }
    .email-steps-label { ${l.stepsLabel} }
    .email-steps-list { ${l.stepsList} }
    .email-steps-item { ${l.stepsItem} }
    .email-event-box { ${l.eventBox} }
    .email-event-text { ${l.eventText} }
    .email-footer { ${l.footer} }
    .email-footer-name { ${l.footerName} }
    .email-footer-link { ${l.footerLink} }
    .email-footer-social { ${l.footerSocial} }
    .email-footer-tagline { ${l.footerTagline} }
    .email-text-strong { color:${LIGHT.textStrong}; }
    .email-link { color:${LIGHT.link};text-decoration:none; }
    @media (prefers-color-scheme: dark) {
      ${darkOverrides}
    }
    [data-ogsc] .email-body { ${d.body} }
    [data-ogsc] .email-outer { ${d.outer} }
    [data-ogsc] .email-outer > tbody > tr > td { background-color:${DARK.pageBg} !important; }
    [data-ogsc] .email-card { ${d.card} }
    [data-ogsc] .email-header { ${d.header} }
    [data-ogsc] .email-body-cell { ${d.bodyCell} }
    [data-ogsc] .email-logo-light { display:none !important; max-height:0 !important; overflow:hidden !important; }
    [data-ogsc] .email-logo-dark { display:block !important; max-height:none !important; }
    [data-ogsc] .email-edition { ${d.edition} }
    [data-ogsc] .email-title { ${d.title} }
    [data-ogsc] .email-tagline { ${d.tagline} }
    [data-ogsc] .email-greeting { ${d.greeting} }
    [data-ogsc] .email-intro { ${d.intro} }
    [data-ogsc] .email-committee-box { ${d.committeeBox} }
    [data-ogsc] .email-committee-label { ${d.committeeLabel} }
    [data-ogsc] .email-committee-name { ${d.committeeName} }
    [data-ogsc] .email-detail-label { ${d.detailLabel} }
    [data-ogsc] .email-detail-value { ${d.detailValue} }
    [data-ogsc] .email-detail-mono { ${d.detailValueMono} }
    [data-ogsc] .email-detail-muted { ${d.detailValueMuted} }
    [data-ogsc] .email-detail-row { ${d.detailRow} }
    [data-ogsc] .email-detail-row-last { ${d.detailRowLast} }
    [data-ogsc] .email-steps-label { ${d.stepsLabel} }
    [data-ogsc] .email-steps-list { ${d.stepsList} }
    [data-ogsc] .email-steps-item { ${d.stepsItem} }
    [data-ogsc] .email-event-box { ${d.eventBox} }
    [data-ogsc] .email-event-text { ${d.eventText} }
    [data-ogsc] .email-footer { ${d.footer} }
    [data-ogsc] .email-footer-name { ${d.footerName} }
    [data-ogsc] .email-footer-link { ${d.footerLink} }
    [data-ogsc] .email-footer-social { ${d.footerSocial} }
    [data-ogsc] .email-footer-tagline { ${d.footerTagline} }
    [data-ogsc] .email-text-strong { color:${DARK.textStrong} !important; }
    [data-ogsc] .email-link { color:${DARK.link} !important; }
  `.trim()
}

function buildAutoThemeBody(data: AllocationEmailData, logoBaseUrl: string): string {
  const lightLogo = getLogoUrl(logoBaseUrl, LIGHT)
  const darkLogo = getLogoUrl(logoBaseUrl, DARK)
  const l = themeStyles(LIGHT)

  const detailRows = [
    data.country
      ? `<tr><td class="email-detail-row"><span class="email-detail-label" style="${l.detailLabel}">Country / Portfolio</span><span class="email-detail-value" style="${l.detailValue}">${escapeHtml(data.country)}</span></td></tr>`
      : '',
    `<tr><td class="email-detail-row"><span class="email-detail-label" style="${l.detailLabel}">Registration ID</span><span class="email-detail-mono" style="${l.detailValueMono}">${escapeHtml(data.registrationId)}</span></td></tr>`,
    `<tr><td class="${data.notes ? 'email-detail-row' : 'email-detail-row-last'}"><span class="email-detail-label" style="${l.detailLabel}">School</span><span class="email-detail-value" style="${l.detailValue}">${escapeHtml(data.school)}</span></td></tr>`,
    data.notes
      ? `<tr><td class="email-detail-row-last"><span class="email-detail-label" style="${l.detailLabel}">Notes</span><span class="email-detail-muted" style="${l.detailValueMuted}">${escapeHtml(data.notes)}</span></td></tr>`
      : '',
  ]
    .filter(Boolean)
    .join('')

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-outer" style="${l.outer}">
  <tr>
    <td align="center" style="padding:32px 16px 48px;background-color:${LIGHT.pageBg};">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="email-card" style="${l.card}">
        <tr>
          <td class="email-header" style="${l.header}">
            <img src="${lightLogo}" alt="${escapeHtml(YUGEN.shortName)}" width="56" height="56" class="email-logo-light" style="display:block;margin:0 auto;width:56px;height:56px;border:0;outline:none;"/>
            <img src="${darkLogo}" alt="${escapeHtml(YUGEN.shortName)}" width="56" height="56" class="email-logo-dark" style="display:none;margin:0 auto;width:56px;height:56px;border:0;outline:none;max-height:0;overflow:hidden;"/>
            <p class="email-edition" style="${l.edition}">${escapeHtml(YUGEN.shortName)} Summit · Edition ${escapeHtml(YUGEN.edition)}</p>
            <h1 class="email-title" style="${l.title}">Committee Allocation</h1>
            <p class="email-tagline" style="${l.tagline}">${escapeHtml(YUGEN.tagline)}</p>
          </td>
        </tr>
        <tr>
          <td class="email-body-cell" style="${l.bodyCell}">
            <p class="email-greeting" style="${l.greeting}">Dear <strong class="email-text-strong" style="color:${LIGHT.textStrong};font-weight:600;">${escapeHtml(data.delegateName)}</strong>,</p>
            <p class="email-intro" style="${l.intro}">Congratulations — we are pleased to confirm your committee allocation for <strong class="email-text-strong" style="color:${LIGHT.textStrong};font-weight:600;">${escapeHtml(YUGEN.name)}</strong>.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-committee-box" style="margin-bottom:28px;${l.committeeBox}">
              <tr>
                <td class="email-committee-inner" style="${l.committeeInner}">
                  <p class="email-committee-label" style="${l.committeeLabel}">Your committee</p>
                  <p class="email-committee-name" style="${l.committeeName}">${escapeHtml(data.committee)}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
              ${detailRows}
            </table>
            <p class="email-steps-label" style="${l.stepsLabel}">Next steps</p>
            <ul class="email-steps-list" style="${l.stepsList}">
              <li class="email-steps-item" style="${l.stepsItem}">Review your committee study guide on our website</li>
              <li class="email-steps-item" style="${l.stepsItem}">Prepare position papers per committee guidelines</li>
              <li class="email-steps-item" style="${l.stepsItem}">Watch for further updates from the secretariat</li>
            </ul>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-event-box" style="${l.eventBox}">
              <tr>
                <td>
                  <p class="email-event-text" style="${l.eventText}"><strong class="email-text-strong" style="color:${LIGHT.textStrong};font-weight:600;">${escapeHtml(YUGEN.datesHero)}</strong><br/>${escapeHtml(YUGEN.venue)}, ${escapeHtml(YUGEN.city)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="email-footer" style="${l.footer}">
            <p class="email-footer-name" style="${l.footerName}">Yūgen Summit Secretariat</p>
            <p class="email-footer-link" style="${l.footerLink}"><a href="mailto:${YUGEN.email}" class="email-link" style="${l.link}">${escapeHtml(YUGEN.email)}</a></p>
            <p class="email-footer-social" style="${l.footerSocial}">
              <a href="${YUGEN.social.instagramUrl}" class="email-link" style="${l.link}">${escapeHtml(YUGEN.social.instagram)}</a>
              · ${escapeHtml(YUGEN.venueShort)}, ${escapeHtml(YUGEN.city)}
            </p>
            <p class="email-footer-tagline" style="${l.footerTagline}">${escapeHtml(YUGEN.tagline)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

export function buildAllocationPlainText(data: AllocationEmailData): string {
  const lines = [
    `Dear ${data.delegateName},`,
    '',
    'Congratulations — your committee allocation for Yūgen Summit 6.0 is confirmed.',
    '',
    `Committee: ${data.committee}`,
  ]

  if (data.country) lines.push(`Country / Portfolio: ${data.country}`)
  lines.push(
    '',
    'Registration details',
    `· Registration ID: ${data.registrationId}`,
    `· School: ${data.school}`,
  )
  if (data.notes) lines.push(`· Notes: ${data.notes}`)
  lines.push(
    '',
    'Next steps',
    '· Review your committee study guide on yugensummit.com/resources',
    '· Prepare position papers per committee guidelines',
    '· Watch for further updates from the secretariat',
    '',
    `${YUGEN.datesHero} · ${YUGEN.venue}, ${YUGEN.city}`,
    '',
    'Best regards,',
    'Yūgen Summit Secretariat',
    YUGEN.email,
    YUGEN.social.instagram,
  )

  return lines.join('\n')
}

export function buildAllocationHtml(
  data: AllocationEmailData,
  options: AllocationEmailOptions = {},
): string {
  const theme = options.theme ?? 'auto'
  const logoBaseUrl = options.logoBaseUrl ?? YUGEN_SEO.siteUrl

  if (theme === 'light' || theme === 'dark') {
    const tokens = theme === 'light' ? LIGHT : DARK
    const logoUrl = getLogoUrl(logoBaseUrl, tokens)
    const body = buildThemedBody(data, tokens, logoUrl)
    const s = themeStyles(tokens)
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="${theme}"/>
  <meta name="supported-color-schemes" content="${theme}"/>
  <title>${escapeHtml(YUGEN.name)} — Committee Allocation</title>
</head>
<body style="${s.body}">
  ${body}
</body>
</html>`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="light dark"/>
  <meta name="supported-color-schemes" content="light dark"/>
  <title>${escapeHtml(YUGEN.name)} — Committee Allocation</title>
  <style type="text/css">
    ${buildAutoThemeStyles()}
  </style>
</head>
<body class="email-body" style="${themeStyles(LIGHT).body}">
  ${buildAutoThemeBody(data, logoBaseUrl)}
</body>
</html>`
}

export function buildAllocationMailtoUrl(data: AllocationEmailData): string {
  const subject = encodeURIComponent(`Yūgen Summit 6.0 — Committee Allocation — ${data.delegateName}`)
  const body = encodeURIComponent(buildAllocationPlainText(data))
  return `mailto:${data.delegateEmail}?subject=${subject}&body=${body}`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
