const nodemailer = require("nodemailer");

/**
 * Create a reusable SMTP transport.
 * Supports any SMTP provider (Gmail, SendGrid, Mailgun, etc.)
 * via environment variables.
 */
const createTransport = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

/**
 * Send a confirmation email to the visitor after a contact form submission.
 *
 * @param {{ name: string, email: string, message: string }} options
 */
const sendContactConfirmation = async ({ name, email, message }) => {
  const transporter = createTransport();

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
};

/**
 * Notify the admin about a new contact form submission.
 *
 * @param {{ name: string, email: string, message: string }} options
 */
const sendAdminNotification = async ({ name, email, message }) => {
  const transporter = createTransport();

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL || "kgurdev25@gmail.com",
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
};

module.exports = { sendContactConfirmation, sendAdminNotification };
