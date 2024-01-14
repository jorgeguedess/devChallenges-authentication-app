import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const SendEmail = async (name: string, token: string, email: string) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_HOST || "user@gmail.com",
    to: email,
    subject: "Forget Password",
    html: `
    Hey, ${name},
    you forgot your password. Click the link below to reset it. <br/>
    <a href="https://dev-challenges-authentication-app.vercel.app/edit-password/?token=${token}" style="color: hsl(202,71%,52%); margin-top: 10px; text-decoration: underline; padding-top: 5px; display: inline-block;">Click</a>
  `,
  });
  return info;
};
