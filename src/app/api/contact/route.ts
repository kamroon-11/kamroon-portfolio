import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // ── Validate required fields ──────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // ── Create SMTP transport ─────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ── Send admin notification (to your inbox) ───────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 24px; border: 2px solid #0A0A0A;">
          <h2 style="margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; vertical-align:top;">Message:</td><td>${message}</td></tr>
          </table>
        </div>
      `,
    });

    // ── Send confirmation to the visitor ──────────────────────────────
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #F5F0E8; border: 3px solid #0A0A0A; padding: 40px;">
          <h1 style="font-size: 28px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">Got your message.</h1>
          <div style="width: 48px; height: 4px; background: #E8B84B; margin-bottom: 24px;"></div>
          <p style="font-size: 16px; line-height: 1.6; color: #0A0A0A;">
            Hi <strong>${name}</strong>, thanks for getting in touch. I'll review your message and get back to you shortly.
          </p>
          <div style="background: #0A0A0A; color: #F5F0E8; padding: 20px; margin: 24px 0; border-left: 4px solid #E8B84B;">
            <p style="margin: 0; font-size: 14px; font-style: italic;">"${message}"</p>
          </div>
          <p style="font-size: 14px; color: #555;">— Karman</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[CONTACT API] Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
