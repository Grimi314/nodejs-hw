import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async ({ from, to, subject, html, text }) => {
  if (!from) {
    throw new Error('SMTP_FROM is required');
  }

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
};
