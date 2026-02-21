import { NextResponse } from 'next/server'
import { getResend, C, escapeHtml, validateEmail } from '@/lib/email'

export async function POST(request) {
  try {
    const { email } = await request.json()

    const emailError = validateEmail(email)
    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 400 })
    }

    const safeEmail = escapeHtml(email)

    const { error } = await getResend().emails.send({
      from: `Website <${process.env.CONTACT_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL],
      subject: `Newsletter: new subscriber ${email}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${C.HEADING}; border-bottom: 2px solid ${C.TEAL}; padding-bottom: 10px;">
            New Newsletter Subscriber
          </h2>
          <div style="background-color: ${C.BG}; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${safeEmail}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid ${C.BORDER}; color: ${C.TEXT}; font-size: 14px;">
            <p>This subscriber signed up via the website newsletter form.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
