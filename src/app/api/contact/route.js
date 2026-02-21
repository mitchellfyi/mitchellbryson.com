import { NextResponse } from 'next/server'
import { getResend, C, validateEmail } from '@/lib/email'

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      )
    }

    const emailError = validateEmail(email)
    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 400 })
    }

    const { error } = await getResend().emails.send({
      from: `Website <${process.env.CONTACT_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL],
      subject: `Contact Form: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${C.HEADING}; border-bottom: 2px solid ${C.TEAL}; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: ${C.BG}; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: ${C.SUBHEADING}; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <div style="background-color: ${C.WHITE}; padding: 20px; border: 1px solid ${C.BORDER}; border-radius: 8px;">
            <h3 style="color: ${C.SUBHEADING}; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid ${C.BORDER}; color: ${C.TEXT}; font-size: 14px;">
            <p>This message was sent from your website's contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
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
