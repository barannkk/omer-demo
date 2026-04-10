import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  await resend.emails.send({
    from: 'OMR WORK <no-reply@contact.omrwork.com>',
    to: 'omr.workco@gmail.com',
    subject: `Yeni mesaj: ${name}`,
    html: `<p><b>İsim:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Mesaj:</b> ${message}</p>`,
  })

  return NextResponse.json({ ok: true })
}