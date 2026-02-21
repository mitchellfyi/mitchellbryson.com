import { Resend } from 'resend'
import { NextResponse } from 'next/server'

let resend = null
function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

const C = {
  TEAL: '#14b8a6',
  HEADING: '#333',
  SUBHEADING: '#555',
  TEXT: '#666',
  BG: '#f8f9fa',
  BORDER: '#e9ecef',
}

function buildEmailHtml({ annualSavings, currentAnnualCost, hoursFreed, hoursPerWeek, paybackPeriod, implementationCost, threeYearNet, threeYearBreaksEven, permalink }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${C.HEADING}; border-bottom: 2px solid ${C.TEAL}; padding-bottom: 10px;">
        Your AI ROI Estimate
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 16px; text-align: center; width: 50%; vertical-align: top;">
            <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 20px;">
              <div style="font-size: 13px; color: #a1a1aa; text-transform: uppercase;">Annual savings</div>
              <div style="font-size: 32px; font-weight: bold; color: #0d9488; margin-top: 4px;">${annualSavings}</div>
              <div style="font-size: 12px; color: ${C.TEXT}; margin-top: 4px;">From a current cost of ${currentAnnualCost}</div>
            </div>
          </td>
          <td style="padding: 16px; text-align: center; width: 50%; vertical-align: top;">
            <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 20px;">
              <div style="font-size: 13px; color: #a1a1aa; text-transform: uppercase;">Payback period</div>
              <div style="font-size: 32px; font-weight: bold; color: #0d9488; margin-top: 4px;">${paybackPeriod}</div>
              <div style="font-size: 12px; color: ${C.TEXT}; margin-top: 4px;">On an investment of ${implementationCost}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px; text-align: center; width: 50%; vertical-align: top;">
            <div style="background: ${C.BG}; border-radius: 12px; padding: 20px;">
              <div style="font-size: 13px; color: #a1a1aa; text-transform: uppercase;">Hours freed per year</div>
              <div style="font-size: 32px; font-weight: bold; color: ${C.HEADING}; margin-top: 4px;">${hoursFreed}</div>
              <div style="font-size: 12px; color: ${C.TEXT}; margin-top: 4px;">${hoursPerWeek} back for higher-value work</div>
            </div>
          </td>
          <td style="padding: 16px; text-align: center; width: 50%; vertical-align: top;">
            <div style="background: ${C.BG}; border-radius: 12px; padding: 20px;">
              <div style="font-size: 13px; color: #a1a1aa; text-transform: uppercase;">3-year net benefit</div>
              <div style="font-size: 32px; font-weight: bold; color: ${C.HEADING}; margin-top: 4px;">${threeYearNet}</div>
              <div style="font-size: 12px; color: ${C.TEXT}; margin-top: 4px;">${threeYearBreaksEven ? 'Total savings minus implementation cost' : 'Does not break even within 3 years'}</div>
            </div>
          </td>
        </tr>
      </table>

      <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 16px 20px; margin: 20px 0;">
        <h3 style="color: #0d9488; margin: 0 0 8px; font-size: 14px;">What does this mean?</h3>
        <p style="color: ${C.TEXT}; font-size: 14px; line-height: 1.6; margin: 0;">These estimates give you a starting point for understanding the potential return on an AI investment. The next step is to identify the right process to automate and build a business case around it.</p>
      </div>

      <div style="margin-top: 24px;">
        <h3 style="color: ${C.SUBHEADING}; margin: 0 0 12px;">Next steps</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 12px; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; background: ${C.TEAL}; color: #fff; font-size: 12px; font-weight: bold;">1</span>
            </td>
            <td style="padding: 8px 12px; color: ${C.TEXT}; font-size: 14px; line-height: 1.5;">Map out the specific tasks within this process that could be automated</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; background: #d4d4d8; color: #52525b; font-size: 12px; font-weight: bold;">2</span>
            </td>
            <td style="padding: 8px 12px; color: ${C.TEXT}; font-size: 14px; line-height: 1.5;">Talk to an AI consultant to validate these estimates with real-world benchmarks</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; background: #d4d4d8; color: #52525b; font-size: 12px; font-weight: bold;">3</span>
            </td>
            <td style="padding: 8px 12px; color: ${C.TEXT}; font-size: 14px; line-height: 1.5;">Run a small pilot to test the approach before committing to a full implementation</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid ${C.BORDER}; color: ${C.TEXT}; font-size: 13px;">
        <p>This report was generated by the <a href="${permalink || 'https://mitchellbryson.com/projects/tools/ai-roi-calculator'}" style="color: ${C.TEAL};">AI ROI Calculator</a> tool on mitchellbryson.com.</p>
        <p>Want to discuss your results? <a href="https://mitchellbryson.com/contact" style="color: ${C.TEAL};">Get in touch</a>.</p>
      </div>
    </div>
  `
}

export async function POST(request) {
  try {
    const { email, toolName, permalink, annualSavings, currentAnnualCost, hoursFreed, hoursPerWeek, paybackPeriod, implementationCost, threeYearNet, threeYearBreaksEven } =
      await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const r = getResend()

    const { error } = await r.emails.send({
      from: `Mitchell Bryson <${process.env.CONTACT_EMAIL}>`,
      to: [email],
      subject: `Your AI ROI Estimate: ${annualSavings} annual savings`,
      html: buildEmailHtml({ annualSavings, currentAnnualCost, hoursFreed, hoursPerWeek, paybackPeriod, implementationCost, threeYearNet, threeYearBreaksEven, permalink }),
    })

    if (error) {
      console.error('Resend error (ROI report):', error)
      return NextResponse.json({ error: 'Failed to send report' }, { status: 500 })
    }

    // Notify Mitchell about the lead
    await r.emails.send({
      from: `Website <${process.env.CONTACT_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL],
      subject: `${toolName}: new lead from ${email}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${C.HEADING}; border-bottom: 2px solid ${C.TEAL}; padding-bottom: 10px;">
            New ${toolName} Lead
          </h2>
          <div style="background: ${C.BG}; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Tool:</strong> ${toolName}</p>
            <p><strong>Results:</strong> <a href="${permalink}" style="color: ${C.TEAL};">${permalink}</a></p>
          </div>
          <p style="color: ${C.TEXT}; font-size: 14px;">Reply directly to this email to reach them.</p>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Report sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
