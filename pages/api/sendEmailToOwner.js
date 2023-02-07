// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_API_KEY,
});

const sendEmailToOwner = async (form) => {
  form.recipient;

  const sentFrom = new Sender("Noreply@dev.carmen4.com", "Vendor Portal");

  const recipients = [new Recipient(form.recipient, form.recipientName)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("New user register")
    .setHtml(
      `Please active <a href="http://localhost:3000/confirmEmail?buid=${form.buId}">Activate</a> this business_unit`
    );
  //.setText("This is the text content");

  await mailerSend.email.send(emailParams);
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    res.status(200).json(await sendEmailToOwner(body));
  }
}
