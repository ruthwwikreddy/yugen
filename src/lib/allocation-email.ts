import { YUGEN } from './yugen'

export type AllocationEmailData = {
  delegateName: string
  delegateEmail: string
  committee: string
  country?: string
  notes?: string
  registrationId?: string
  school: string
}

export type AllocationEmailTheme = 'light' | 'dark' | 'auto'

export type AllocationEmailOptions = {
  theme?: AllocationEmailTheme
  logoUrl?: string
}

const LOGO_URL = 'https://yugen.ruthwikreddy.live/logo-white@2x.png'

function resolveCommitteeRoom(committeeAcronym: string): string | undefined {
  const match = YUGEN.committees.find(
    (c) => c.acronym.toLowerCase() === committeeAcronym.trim().toLowerCase(),
  )
  return match?.venue
}

export function buildAllocationPlainText(data: AllocationEmailData): string {
  const lines = [
    `Dear ${data.delegateName},`,
    '',
    'Congratulations — your official committee allocation for Yūgen Summit 6.0 is confirmed.',
    '',
    '--------------------------------------------------',
    'COMMITTEE ALLOCATION DETAILS',
    '--------------------------------------------------',
    `Committee : ${data.committee}`,
  ]

  if (data.country) {
    lines.push(`Country / Portfolio : ${data.country}`)
  }

  const room = resolveCommitteeRoom(data.committee)

  lines.push(
    `School / Institution : ${data.school}`,
    `Dates : ${YUGEN.dates}`,
    `Venue : ${YUGEN.venue}, ${YUGEN.city}`,
    ...(room ? [`Committee Room : ${room}`] : []),
    '--------------------------------------------------',
    '',
    'NEXT STEPS:',
    '1. Review your committee study guide on our website.',
    '2. Prepare position papers according to committee guidelines.',
    '3. Stay tuned for further delegate announcements.',
    '',
    'Warm regards,',
    'Yūgen Summit Secretariat',
    YUGEN.email,
    YUGEN.social.instagram,
  )

  return lines.join('\n')
}

export function buildAllocationHtml(
  data: AllocationEmailData,
  options: AllocationEmailOptions = {}
): string {
  const logoSrc = options.logoUrl || LOGO_URL
  const room = resolveCommitteeRoom(data.committee)

  const countryBlock = data.country
    ? `<div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);">
         <span style="display:block;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#BFADA8;margin-bottom:4px;">Country / Portfolio</span>
         <span style="display:block;font-size:17px;font-weight:600;color:#ffffff;letter-spacing:0.01em;">${escapeHtml(data.country)}</span>
       </div>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Yūgen Summit 6.0 — Committee Allocation</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#000000;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background-color:#0a0a0a;border:1px solid rgba(255,255,255,0.12);border-radius:16px;overflow:hidden;">

          <!-- Top Accent Bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg, #5D2128 0%, #7E5758 50%, #BFADA8 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 32px;text-align:center;background-color:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.08);">
              <img src="${logoSrc}" alt="${escapeHtml(YUGEN.shortName)}" width="56" style="display:block;margin:0 auto;width:56px;height:auto;" />
              <div style="display:inline-block;margin-top:18px;padding:4px 14px;border-radius:20px;background-color:#111111;border:1px solid rgba(255,255,255,0.12);">
                <span style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#BFADA8;">Yūgen Summit 6.0</span>
              </div>
              <h1 style="margin:14px 0 0;font-size:22px;font-weight:700;letter-spacing:0.04em;color:#ffffff;text-transform:uppercase;">Committee Allocation</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:rgba(255,255,255,0.9);">Dear <strong style="color:#ffffff;">${escapeHtml(data.delegateName)}</strong>,</p>
              <p style="margin:0 0 32px;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.55);">We are pleased to confirm your official committee assignment for <strong style="color:rgba(255,255,255,0.85);">Yūgen Summit 6.0</strong>. Your allocation details are below.</p>

              <!-- Allocation Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#111111;border:1px solid rgba(255,255,255,0.12);border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <span style="display:block;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#BFADA8;margin-bottom:8px;">Allocated Committee</span>
                    <span style="display:block;font-size:20px;font-weight:700;color:#ffffff;line-height:1.3;">${escapeHtml(data.committee)}</span>
                    ${countryBlock}
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#111111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 28px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:13px;">
                      <tr>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.4);width:110px;vertical-align:top;">School</td>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.85);font-weight:500;">${escapeHtml(data.school)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="height:1px;background:rgba(255,255,255,0.06);padding:0;"></td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.4);width:110px;">Dates</td>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.85);font-weight:500;">${escapeHtml(YUGEN.dates)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="height:1px;background:rgba(255,255,255,0.06);padding:0;"></td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.4);width:110px;">Venue</td>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.85);font-weight:500;">${escapeHtml(YUGEN.venue)}, ${escapeHtml(YUGEN.city)}</td>
                      </tr>
                      ${room ? `
                      <tr>
                        <td colspan="2" style="height:1px;background:rgba(255,255,255,0.06);padding:0;"></td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.4);width:110px;">Committee Room</td>
                        <td style="padding:7px 0;color:rgba(255,255,255,0.85);font-weight:500;">${escapeHtml(room)}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <div style="border-left:2px solid #7E5758;padding-left:16px;margin-bottom:32px;">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#BFADA8;">Next Steps</p>
                <ul style="margin:0;padding-left:16px;font-size:13px;line-height:1.8;color:rgba(255,255,255,0.55);">
                  <li style="margin-bottom:2px;">Study guides for your council will be available on our website.</li>
                  <li style="margin-bottom:2px;">Prepare your position paper as per committee guidelines.</li>
                  <li>Follow our email and Instagram for further updates.</li>
                </ul>
              </div>

              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;">Warm regards,<br/><strong style="color:#ffffff;">Yūgen Summit Secretariat</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background-color:#050505;border-top:1px solid rgba(255,255,255,0.06);text-align:center;font-size:12px;color:rgba(255,255,255,0.3);">
              <p style="margin:0 0 6px;">
                <a href="mailto:yugenprops25@gmail.com" style="color:#BFADA8;text-decoration:none;">
                  yugenprops25@gmail.com
                </a>
                &nbsp;·&nbsp;
                <a href="${YUGEN.social.instagramUrl}" style="color:#BFADA8;text-decoration:none;">${escapeHtml(YUGEN.social.instagram)}</a>
              </p>
              <p style="margin:0;font-size:11px;">${escapeHtml(YUGEN.venue)}, ${escapeHtml(YUGEN.city)}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
