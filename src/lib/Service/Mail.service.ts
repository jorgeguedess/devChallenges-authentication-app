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
      yout forget password link is below click the link <br/>
      <a href="http://localhost:3000/edit-password/?token=${token}">Click</a>
    `,
  });
  return info;
};
