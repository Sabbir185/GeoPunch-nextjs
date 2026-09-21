/**
 * Premium, eye-catching transactional email templates for GPI Connect
 * Compatible with all major email clients (Gmail, Outlook, Apple Mail, Yahoo)
 */

const LOGO_URL =
  "https://raw.githubusercontent.com/Sabbir185/GeoPunch-nextjs/main/public/images/gpi-logo-3d.png";
const CUSTOM_SITE_URL = "https://www.gpiconnect.com";

function getSiteUrl(): string {
  return CUSTOM_SITE_URL;
}

/**
 * Base layout wrapper for all GPI Connect emails
 */
function baseTemplate({
  previewText,
  headerBadge = "Presence & Availability",
  content,
}: {
  previewText: string;
  headerBadge?: string;
  content: string;
}): string {
  const siteUrl = getSiteUrl();
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>GPI Connect</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; }
      .content-padding { padding: 24px 20px !important; }
      .header-padding { padding: 24px 20px 20px 20px !important; }
      .otp-code { font-size: 30px !important; letter-spacing: 6px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9;">
  <!-- Preheader text for inbox snippet -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${previewText}
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 32px 16px 40px 16px;">
        <!-- Container Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Gradient Line -->
          <tr>
            <td style="background: linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #0d9488 100%); height: 5px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header with Logo & Brand -->
          <tr>
            <td class="header-padding" style="padding: 32px 36px 24px 36px; border-bottom: 1px solid #f1f5f9; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" valign="middle">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Brand Logo -->
                        <td valign="middle" style="padding-right: 14px;">
                          <a href="${siteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                            <img src="${LOGO_URL}" alt="GPI Connect Logo" width="44" height="44" style="display: block; border-radius: 12px; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2); width: 44px; height: 44px; object-fit: contain;" />
                          </a>
                        </td>
                        <!-- Brand Text -->
                        <td valign="middle">
                          <a href="${siteUrl}" target="_blank" style="text-decoration: none;">
                            <div style="font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.1; letter-spacing: -0.5px;">
                              GPI <span style="color: #2563eb;">Connect</span>
                            </div>
                            <div style="font-size: 11px; font-weight: 600; color: #64748b; letter-spacing: 0.2px; margin-top: 2px;">
                              ${headerBadge}
                            </div>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background-color: #eff6ff; color: #2563eb; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 10px; border-radius: 9999px; border: 1px solid #bfdbfe;">
                      Verified
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="content-padding" style="padding: 36px; color: #334155; font-size: 15px; line-height: 1.65;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px 32px 36px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- Quick Navigation Links -->
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <a href="${siteUrl}/activity" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 12px; font-weight: 600; margin: 0 10px;">Live Board</a>
                    <span style="color: #cbd5e1;">•</span>
                    <a href="${siteUrl}" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 12px; font-weight: 600; margin: 0 10px;">Home</a>
                    <span style="color: #cbd5e1;">•</span>
                    <a href="${siteUrl}/privacy" target="_blank" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy</a>
                    <span style="color: #cbd5e1;">•</span>
                    <a href="${siteUrl}/terms" target="_blank" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px;">Terms</a>
                  </td>
                </tr>
                <!-- Automated Notice & Copyright -->
                <tr>
                  <td align="center" style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
                    <p style="margin: 0 0 6px 0;">This email was securely delivered via <strong>GPI Connect</strong>.</p>
                    <p style="margin: 0; font-size: 11px; color: #a1a1aa;">© ${currentYear} GPI Connect Presence System. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 1. Faculty / User Activity Message Email Template
 */
export function getActivityEmailTemplate({
  senderName,
  senderEmail,
  recipientName,
  subject,
  htmlBody,
}: {
  senderName: string;
  senderEmail?: string;
  recipientName?: string;
  subject: string;
  htmlBody: string;
}): string {
  const siteUrl = getSiteUrl();

  const content = `
    <!-- Notification & Recipient Info -->
    <div style="margin-bottom: 22px;">
      ${
        recipientName
          ? `<div style="font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">To: <span style="color: #0f172a;">${recipientName}</span></div>`
          : ""
      }
      <p style="margin: 0; font-size: 14px; color: #64748b;">
        You have received a new message on <strong>GPI Connect</strong>.
      </p>
    </div>

    <!-- Sender Information Badge (Borderless & Clean) -->
    <div style="background: #f8fafc; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px; display: table; width: 100%; box-sizing: border-box;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="38" valign="middle" style="padding-right: 12px;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #ffffff; font-weight: 700; font-size: 15px; text-align: center; line-height: 38px;">
              ${(senderName || "U").charAt(0).toUpperCase()}
            </div>
          </td>
          <td valign="middle">
            <div style="font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.2;">
              ${senderName}
            </div>
            ${
              senderEmail
                ? `<div style="font-size: 12px; color: #64748b; margin-top: 2px;">${senderEmail}</div>`
                : ""
            }
          </td>
          <td align="right" valign="middle">
            <span style="font-size: 11px; font-weight: 600; color: #2563eb; background: #eff6ff; padding: 3px 10px; border-radius: 6px; border: 1px solid #dbeafe;">
              Direct Message
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Message Container -->
    <div style="background-color: #ffffff; border-left: 4px solid #2563eb; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 22px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);">
      <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #2563eb; letter-spacing: 0.5px; margin-bottom: 8px;">
        Subject: ${subject}
      </div>
      <div style="font-size: 15px; line-height: 1.65; color: #1e293b;">
        ${htmlBody}
      </div>
    </div>
  `;

  return baseTemplate({
    previewText: `Message from ${senderName}: ${subject}`,
    headerBadge: "Activity Message",
    content,
  });
}

/**
 * 2. OTP Verification Email Template
 */
export function getOtpEmailTemplate({
  otp,
  action = "Verification",
}: {
  otp: string;
  action?: string;
}): string {
  const content = `
    <!-- Heading -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; width: 48px; height: 48px; border-radius: 12px; background: #eff6ff; text-align: center; line-height: 48px; margin-bottom: 14px;">
        <span style="font-size: 24px;">🔐</span>
      </div>
      <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px;">
        Your One-Time Password
      </h2>
      <p style="margin: 0; font-size: 14px; color: #64748b;">
        Use the verification code below to complete your <strong>${action}</strong> request.
      </p>
    </div>

    <!-- OTP Display Card -->
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%); border: 2px dashed #3b82f6; border-radius: 16px; padding: 24px 20px; text-align: center; margin: 24px 0 28px 0;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #2563eb; letter-spacing: 1.5px; margin-bottom: 8px;">
        Security Verification Code
      </div>
      <div class="otp-code" style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 38px; font-weight: 800; color: #1d4ed8; letter-spacing: 8px; margin: 4px 0;">
        ${otp}
      </div>
      <div style="font-size: 12px; color: #64748b; margin-top: 10px; font-weight: 500;">
        ⏱ Expires in <strong style="color: #dc2626;">5 minutes</strong>
      </div>
    </div>

    <!-- Security Warning -->
    <div style="background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 10px; padding: 14px 16px; margin-top: 20px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="24" valign="top" style="font-size: 16px; padding-right: 10px;">⚠️</td>
          <td style="font-size: 13px; color: #991b1b; line-height: 1.5;">
            <strong>Important Security Notice:</strong> Never share this code with anyone. GPI Connect staff will never ask for your verification code.
          </td>
        </tr>
      </table>
    </div>
  `;

  return baseTemplate({
    previewText: `Your OTP is ${otp} (valid for 5 minutes)`,
    headerBadge: "Authentication Security",
    content,
  });
}

/**
 * 3. Welcome & User Credentials Email Template
 */
export function getWelcomeEmailTemplate({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password?: string;
}): string {
  const siteUrl = getSiteUrl();

  const content = `
    <!-- Header Greeting -->
    <div style="margin-bottom: 24px;">
      <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px;">
        Welcome to GPI Connect, ${name}! 🎉
      </h2>
      <p style="margin: 0; font-size: 14px; color: #64748b;">
        Your official account has been configured by the system administrator. You now have full access to presence tracking, team availability, and live attendance.
      </p>
    </div>

    <!-- Account Details Card -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin: 24px 0 28px 0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #2563eb; letter-spacing: 0.8px; margin-bottom: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
        Your Login Credentials
      </div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #64748b; width: 90px; font-weight: 600;">Email:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">${email}</td>
        </tr>
        ${
          password
            ? `
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #64748b; font-weight: 600;">Password:</td>
          <td style="padding: 6px 0;">
            <code style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px; font-size: 14px; font-weight: 700; font-family: monospace;">${password}</code>
          </td>
        </tr>
        `
            : ""
        }
      </table>
    </div>

    <!-- Next Steps List -->
    <div style="margin-bottom: 28px;">
      <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #0f172a;">
        Recommended Next Steps:
      </h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #475569; line-height: 1.8;">
        <li>Log in to your account using the credentials above.</li>
        <li>Update your password in Account Settings for enhanced security.</li>
        <li>Check the <strong>Live Activity Board</strong> to view real-time presence.</li>
      </ol>
    </div>

    <!-- Login CTA Button -->
    <div style="text-align: center; margin: 32px 0 16px 0;">
      <a href="${siteUrl}/login" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff !important; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 10px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); letter-spacing: 0.2px;">
        Log In to GPI Connect →
      </a>
    </div>
  `;

  return baseTemplate({
    previewText: `Welcome to GPI Connect! Your account credentials inside.`,
    headerBadge: "Welcome & Onboarding",
    content,
  });
}
