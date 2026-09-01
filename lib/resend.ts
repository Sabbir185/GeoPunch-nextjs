import { Resend } from "resend";

export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    const client = new Resend(process.env.RESEND_API_KEY || "re_dummy");
    return (client as any)[prop];
  },
});

interface IPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

export const sendEmail = async ({ from, to, subject, html }: IPayload) => {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
  return { data, error };
};
