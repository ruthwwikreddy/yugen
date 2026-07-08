import { YUGEN } from './yugen'

export type AllocationEmailData = {
  delegateName: string
  delegateEmail: string
  committee: string
  country?: string
  registrationId: string
  school: string
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
  )

  return lines.join('\n')
}

export function buildAllocationHtml(data: AllocationEmailData): string {
  const countryRow = data.country
    ? `<tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Country</span><br/>
          <span style="font-size:16px;font-weight:600;color:#ffffff;">${escapeHtml(data.country)}</span>
        </td>
      </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Yūgen Summit 6.0 — Committee Allocation</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#000000;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;border:1px solid rgba(255,255,255,0.12);border-radius:16px;overflow:hidden;background:#0a0a0a;">
          <tr>
            <td style="padding:32px 28px 24px;background:linear-gradient(180deg,rgba(255,255,255,0.04) 0%,transparent 100%);border-bottom:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0 0 8px;font-size:10px;font-weight:500;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Yūgen Summit · Edition ${YUGEN.edition}</p>
              <h1 style="margin:0;font-family:'Anton',Impact,sans-serif;font-size:32px;font-weight:400;letter-spacing:0.02em;text-transform:uppercase;color:#ffffff;line-height:1;">Committee Allocation</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.85);">Dear <strong style="color:#ffffff;">${escapeHtml(data.delegateName)}</strong>,</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.65);">Congratulations — we are pleased to confirm your committee allocation for <strong style="color:#ffffff;">Yūgen Summit 6.0</strong>.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border:1px solid rgba(255,255,255,0.14);border-radius:12px;background:#111111;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Your committee</p>
                    <p style="margin:0;font-family:'Space Grotesk',Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.3;">${escapeHtml(data.committee)}</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                ${countryRow}
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <span style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Registration ID</span><br/>
                    <span style="font-size:14px;font-weight:600;color:#ffffff;font-family:monospace;">${escapeHtml(data.registrationId)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <span style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35);">School</span><br/>
                    <span style="font-size:15px;color:rgba(255,255,255,0.85);">${escapeHtml(data.school)}</span>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 10px;font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Next steps</p>
              <ul style="margin:0 0 28px;padding-left:18px;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.65);">
                <li>Review your committee study guide on our website</li>
                <li>Prepare position papers per committee guidelines</li>
                <li>Watch for further updates from the secretariat</li>
              </ul>
              <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(255,255,255,0.45);">${YUGEN.datesHero}<br/>${YUGEN.venue}, ${YUGEN.city}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#ffffff;">Yūgen Summit Secretariat</p>
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);"><a href="mailto:${YUGEN.email}" style="color:rgba(255,255,255,0.65);text-decoration:none;">${YUGEN.email}</a></p>
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
