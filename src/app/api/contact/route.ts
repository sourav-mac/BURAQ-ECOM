import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, serviceType, message } = body;

    if (!fullName || !email || !phone || !serviceType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Server-side strict email and phone validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid business email address' }, { status: 400 });
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return NextResponse.json({ error: 'Invalid phone number (must contain 10-15 digits)' }, { status: 400 });
    }

    // Configure the transporter with Zoho Mail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.in',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false', // true for 465 (SSL)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Map service slug to friendly display name
    const serviceLabels: Record<string, string> = {
      "lighting-products": "Lighting Products (LED Panels, High Bays, Downlights, Floodlights)",
      "solar-components": "Solar Components (PV Modules, Inverters, DC Cables, Mounting)",
      "electrical-products": "Electrical Products (Power Cables, Switchgear, Breakers)",
      "manpower-supply": "Technical Manpower Supply (Technical Workers & Helpers)",
      "general-inquiry": "General Business Inquiry",
      "electrical-trading": "Electrical & Solar Products",
      "solar-modules": "Solar Modules & Energy Products",
      "ac-maintenance": "AC Services (Legacy)",
    };

    const friendlyService = serviceLabels[serviceType] || serviceType;
    const receivedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Create a modern responsive HTML email template for all screen sizes (Desktops, Tablets & Mobile)
    const mailOptions = {
      from: `"BURAQ Web Portal" <${process.env.EMAIL_USER || 'info@buraq.in'}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER || 'info@buraq.in',
      replyTo: email, // If you reply to the email, it goes directly to the client
      subject: `🔔 New Inquiry: [${friendlyService}] - ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
          <title>New BURAQ Inquiry</title>
          <!--[if mso]>
          <style type="text/css">
            body, table, td, a { font-family: Arial, sans-serif !important; }
          </style>
          <![endif]-->
          <style type="text/css">
            /* Client-specific Resets */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
            a { text-decoration: none !important; }
            a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }

            /* Mobile Responsive Styles */
            @media only screen and (max-width: 600px) {
              .mobile-header-pad {
                padding: 20px 16px !important;
              }
              .mobile-banner-pad {
                padding: 12px 16px !important;
              }
              .mobile-content-pad {
                padding: 24px 16px !important;
              }
              .mobile-footer-pad {
                padding: 20px 16px !important;
              }
              .mobile-title {
                font-size: 22px !important;
              }
              .mobile-badge {
                font-size: 10px !important;
                padding: 4px 8px !important;
              }
              .mobile-stack-row {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
              }
              .mobile-stack-label {
                display: block !important;
                width: 100% !important;
                padding-bottom: 2px !important;
              }
              .mobile-stack-val {
                display: block !important;
                width: 100% !important;
                padding-top: 0 !important;
                padding-bottom: 12px !important;
              }
              .mobile-message-box {
                padding: 14px 16px !important;
                font-size: 14px !important;
              }
              .mobile-cta-table {
                width: 100% !important;
              }
              .mobile-cta-cell {
                display: block !important;
                width: 100% !important;
                margin-bottom: 10px !important;
                box-sizing: border-box !important;
              }
              .mobile-cta-btn {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
                text-align: center !important;
              }
              .mobile-spacer {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; width: 100% !important; min-width: 100%; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
          
          <!-- Full-Width Fluid Table -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; margin: 0; padding: 0; background-color: #ffffff;">
            
            <!-- Header -->
            <tr>
              <td class="mobile-header-pad" style="background: #12372A; padding: 28px 36px; text-align: left;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td valign="middle">
                      <div class="mobile-title" style="font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin-bottom: 2px;">BURAQ</div>
                      <div style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #86efac;">Website Inquiry Notification</div>
                    </td>
                    <td align="right" valign="middle">
                      <span class="mobile-badge" style="display: inline-block; padding: 6px 14px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 4px; color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;">NEW LEAD</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Service Banner -->
            <tr>
              <td class="mobile-banner-pad" style="background-color: #f8fafc; padding: 14px 36px; border-bottom: 1px solid #e2e8f0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Service Category:</td>
                    <td align="right" style="font-size: 13px; font-weight: 700; color: #12372A; word-break: break-word;">${friendlyService}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td class="mobile-content-pad" style="padding: 36px;">
                
                <!-- Customer Details Section -->
                <h3 style="margin: 0 0 16px 0; font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                  Customer Information
                </h3>

                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                  <tr class="mobile-stack-row" style="border-bottom: 1px solid #f1f5f9;">
                    <td class="mobile-stack-label" style="padding: 10px 0; font-size: 13px; color: #64748b; width: 200px;">Full Name:</td>
                    <td class="mobile-stack-val" style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word;">${fullName}</td>
                  </tr>
                  <tr class="mobile-stack-row" style="border-bottom: 1px solid #f1f5f9;">
                    <td class="mobile-stack-label" style="padding: 10px 0; font-size: 13px; color: #64748b;">Business Email:</td>
                    <td class="mobile-stack-val" style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #12372A; word-break: break-word;">
                      <a href="mailto:${email}" style="color: #12372A; text-decoration: none !important; text-underline-offset: unset;">${email}</a>
                    </td>
                  </tr>
                  <tr class="mobile-stack-row" style="border-bottom: 1px solid #f1f5f9;">
                    <td class="mobile-stack-label" style="padding: 10px 0; font-size: 13px; color: #64748b;">Contact Phone:</td>
                    <td class="mobile-stack-val" style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word;">
                      <a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  <tr class="mobile-stack-row" style="border-bottom: 1px solid #f1f5f9;">
                    <td class="mobile-stack-label" style="padding: 10px 0; font-size: 13px; color: #64748b;">Company / Org:</td>
                    <td class="mobile-stack-val" style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word;">${companyName || 'Not specified'}</td>
                  </tr>
                </table>

                <!-- Message Section -->
                <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                  Requirement / Inquiry Details
                </h3>
                
                <div class="mobile-message-box" style="background-color: #f8fafc; border-left: 4px solid #12372A; padding: 18px 22px; font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 32px; white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word;">${message}</div>

                <!-- Action CTAs -->
                <table class="mobile-cta-table" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                  <tr>
                    <td class="mobile-cta-cell" style="background-color: #12372A; border-radius: 6px; text-align: center;">
                      <a class="mobile-cta-btn" href="mailto:${email}?subject=Regarding your BURAQ Inquiry - ${encodeURIComponent(friendlyService)}" style="background-color: #12372A; border: 1px solid #12372A; border-radius: 6px; color: #ffffff; display: inline-block; font-size: 14px; font-weight: 600; padding: 12px 24px; text-decoration: none;">
                        ✉️ Reply to ${fullName.split(' ')[0]}
                      </a>
                    </td>
                    <td class="mobile-spacer" width="12"></td>
                    <td class="mobile-cta-cell" style="background-color: #f1f5f9; border-radius: 6px; text-align: center;">
                      <a class="mobile-cta-btn" href="tel:${phone}" style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #334155; display: inline-block; font-size: 14px; font-weight: 600; padding: 12px 22px; text-decoration: none;">
                        📞 Call Client
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="mobile-footer-pad" style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 36px; text-align: left;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b;">
                        Received on <strong>${receivedAt}</strong> via BURAQ Web Contact Form
                      </p>
                      <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.4;">
                        BURAQ ENTERPRISE • Lighting Products • Solar Components • Electrical Products • Technical Manpower
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error('Error sending email via Zoho SMTP:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to send email. Please verify SMTP settings.' },
      { status: 500 }
    );
  }
}
