import { Resend } from 'resend'
import { NextResponse } from 'next/server'

let resend = null
export function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export const C = {
  TEAL: '#14b8a6',
  HEADING: '#333',
  SUBHEADING: '#555',
  TEXT: '#666',
  BG: '#f8f9fa',
  WHITE: '#fff',
  BORDER: '#e9ecef',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  if (!email) return 'Email is required'
  if (!EMAIL_REGEX.test(email)) return 'Invalid email address'
  return null
}

export async function sendReportAndLead({ email, toolName, permalink, subject, html, leadSummaryHtml }) {
  const error = validateEmail(email)
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  try {
    const r = getResend()

    const { error: sendError } = await r.emails.send({
      from: `Mitchell Bryson <${process.env.CONTACT_EMAIL}>`,
      to: [email],
      subject,
      html,
    })

    if (sendError) {
      console.error(`Resend error (${toolName}):`, sendError)
      return NextResponse.json({ error: 'Failed to send report' }, { status: 500 })
    }

    // Send lead notification — log errors but don't fail the user request
    try {
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
              ${leadSummaryHtml}
              <p><strong>Results:</strong> <a href="${permalink}" style="color: ${C.TEAL};">${permalink}</a></p>
            </div>
            <p style="color: ${C.TEXT}; font-size: 14px;">Reply directly to this email to reach them.</p>
          </div>
        `,
      })
    } catch (leadError) {
      console.error(`Lead notification failed (${toolName}):`, leadError)
    }

    return NextResponse.json({ message: 'Report sent successfully' }, { status: 200 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
