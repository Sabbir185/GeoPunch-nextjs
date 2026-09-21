interface SendEmailPayload {
  from?: string;
  senderName?: string;
  to: string[];
  subject: string;
  html: string;
}

function parseSender(fromStr?: string, defaultName: string = "GPI Connect") {
  if (!fromStr) {
    return {
      name: defaultName,
      email: process.env.FROM_EMAIL || process.env.BREVO_SENDER_EMAIL || "",
    };
  }
  const match = fromStr.match(/^(.*?)\s*<(.+)>$/);
  if (match) {
    return {
      name: match[1].trim() || defaultName,
      email: match[2].trim(),
    };
  }
  return {
    name: defaultName,
    email: fromStr.trim(),
  };
}

export const sendEmail = async ({
  from,
  senderName = "GPI Connect",
  to,
  subject,
  html,
}: SendEmailPayload) => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("Brevo API key is missing (BREVO_API_KEY in .env)");
    return {
      data: null,
      error: { message: "Brevo API key is not configured" },
    };
  }

  const parsedSender = parseSender(from, senderName);

  if (!parsedSender.email) {
    console.error("Sender email is missing (FROM_EMAIL in .env)");
    return {
      data: null,
      error: { message: "Sender email is not configured" },
    };
  }

  try {
    const recipients = to.map((email) => ({
      email: email.trim(),
    }));

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: parsedSender.name,
          email: parsedSender.email,
        },
        to: recipients,
        subject,
        htmlContent: html,
      }),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Brevo API error response:", responseData);
      return {
        data: null,
        error: responseData || {
          message: `Failed to send email via Brevo (Status: ${response.status})`,
        },
      };
    }

    return {
      data: {
        id: responseData?.messageId || "sent",
      },
      error: null,
    };
  } catch (err: any) {
    console.error("Brevo sendEmail exception:", err);
    return {
      data: null,
      error: { message: err?.message || "Unknown error sending email with Brevo" },
    };
  }
};
