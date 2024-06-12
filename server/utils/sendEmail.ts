import nodemailer from 'nodemailer';

type EmailOptions = {
  from: string;
  email: string;
  subject: string;
  message: string;
};


const sendEmail = async (options: EmailOptions) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(message);
};

export default sendEmail;
