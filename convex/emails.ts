import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_EMAIL = "1DORUZ Records <noreply@1doruz.com>";

export const sendVerificationEmail = internalAction({
  args: {
    email: v.string(),
    token: v.string(),
  },
  handler: async (_, args) => {
    const { email, token } = args;
    const verifyUrl = `${process.env.SITE_URL}/verify?token=${token}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify your email - 1DORUZ Records",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="background:#050505;color:#fafafa;font-family:Inter,sans-serif;padding:40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <table style="max-width:480px;width:100%;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:12px;padding:40px;">
                <tr><td align="center" style="padding-bottom:24px;">
                  <div style="font-size:28px;font-weight:700;color:#C5A059;">1DORUZ</div>
                  <div style="font-size:11px;letter-spacing:0.3em;color:#666;text-transform:uppercase;">Records</div>
                </td></tr>
                <tr><td style="padding-bottom:16px;">
                  <h1 style="font-size:20px;font-weight:600;margin:0 0 8px;">Verify your email</h1>
                  <p style="color:#888;font-size:14px;line-height:1.6;margin:0;">
                    Click the button below to verify your email address and activate your account.
                  </p>
                </td></tr>
                <tr><td align="center" style="padding:24px 0;">
                  <a href="${verifyUrl}" style="display:inline-block;background:#C5A059;color:#050505;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.05em;padding:14px 36px;border-radius:6px;">
                    VERIFY EMAIL
                  </a>
                </td></tr>
                <tr><td style="padding-top:16px;border-top:1px solid #1a1a1a;">
                  <p style="color:#555;font-size:12px;margin:0;">
                    If you didn't request this, you can safely ignore this email.<br>
                    &copy; 2024 1DORUZ Records. All rights reserved.
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });
  },
});

export const sendMagicLink = internalAction({
  args: {
    email: v.string(),
    token: v.string(),
  },
  handler: async (_, args) => {
    const { email, token } = args;
    const loginUrl = `${process.env.SITE_URL}/login?token=${token}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Sign in to 1DORUZ Records",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="background:#050505;color:#fafafa;font-family:Inter,sans-serif;padding:40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <table style="max-width:480px;width:100%;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:12px;padding:40px;">
                <tr><td align="center" style="padding-bottom:24px;">
                  <div style="font-size:28px;font-weight:700;color:#C5A059;">1DORUZ</div>
                  <div style="font-size:11px;letter-spacing:0.3em;color:#666;text-transform:uppercase;">Records</div>
                </td></tr>
                <tr><td style="padding-bottom:16px;">
                  <h1 style="font-size:20px;font-weight:600;margin:0 0 8px;">Sign in to your account</h1>
                  <p style="color:#888;font-size:14px;line-height:1.6;margin:0;">
                    Click the link below to sign in. This link expires in 15 minutes.
                  </p>
                </td></tr>
                <tr><td align="center" style="padding:24px 0;">
                  <a href="${loginUrl}" style="display:inline-block;background:#C5A059;color:#050505;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.05em;padding:14px 36px;border-radius:6px;">
                    SIGN IN
                  </a>
                </td></tr>
                <tr><td style="padding-top:16px;border-top:1px solid #1a1a1a;">
                  <p style="color:#555;font-size:12px;margin:0;">
                    If you didn't request this, you can safely ignore this email.<br>
                    &copy; 2024 1DORUZ Records. All rights reserved.
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });
  },
});

export const sendContactNotification = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (_, args) => {
    const { name, email, message } = args;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: "info@1doruz.com",
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="background:#050505;color:#fafafa;font-family:Inter,sans-serif;padding:40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <table style="max-width:480px;width:100%;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:12px;padding:40px;">
                <tr><td style="padding-bottom:24px;">
                  <h1 style="font-size:20px;font-weight:600;margin:0;color:#C5A059;">New Contact Submission</h1>
                </td></tr>
                <tr><td style="padding-bottom:16px;border-bottom:1px solid #1a1a1a;">
                  <p style="color:#888;font-size:13px;margin:0 0 4px;"><strong style="color:#fafafa;">Name:</strong> ${name}</p>
                  <p style="color:#888;font-size:13px;margin:0 0 4px;"><strong style="color:#fafafa;">Email:</strong> ${email}</p>
                </td></tr>
                <tr><td style="padding-top:16px;">
                  <p style="color:#aaa;font-size:14px;line-height:1.6;margin:0;">${message}</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });
  },
});

export const sendDemoNotification = internalAction({
  args: {
    artistName: v.string(),
    email: v.string(),
    bio: v.string(),
  },
  handler: async (_, args) => {
    const { artistName, email, bio } = args;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: "ar@1doruz.com",
      subject: `New Demo Submission - ${artistName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="background:#050505;color:#fafafa;font-family:Inter,sans-serif;padding:40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <table style="max-width:480px;width:100%;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:12px;padding:40px;">
                <tr><td style="padding-bottom:24px;">
                  <h1 style="font-size:20px;font-weight:600;margin:0;color:#C5A059;">New Demo Submission</h1>
                </td></tr>
                <tr><td style="padding-bottom:16px;border-bottom:1px solid #1a1a1a;">
                  <p style="color:#888;font-size:13px;margin:0 0 4px;"><strong style="color:#fafafa;">Artist:</strong> ${artistName}</p>
                  <p style="color:#888;font-size:13px;margin:0 0 4px;"><strong style="color:#fafafa;">Email:</strong> ${email}</p>
                </td></tr>
                <tr><td style="padding-top:16px;">
                  <p style="color:#aaa;font-size:14px;line-height:1.6;margin:0;">${bio}</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });
  },
});
