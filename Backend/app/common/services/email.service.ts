import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";
import { loadConfig } from "../helper/config.hepler";

loadConfig();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (mailOptions: Mail.Options): Promise<any> => {
  try {
    return await transporter.sendMail(mailOptions);//mailOptions, which is an object containing information about the email (e.g., to, subject, body, etc.).
  } catch (error: any) {
    createHttpError(500, { message: error.message });
  }
};

export const resetPasswordEmailTemplate = (token = ""): string => `
<html>
  <body>
    <h3>Welcome to app</h3>
    <p>Click <a href="${process.env.FE_BASE_URL}/reset-password?token=${token}">here</a> to reset your password</p>
  </body>
</html>`;





// *examples*
// import { sendEmail, resetPasswordEmailTemplate } from "./email.service";

// // Example of generating a reset token (you'd generate this token in your app logic)
// const resetToken = "someUniqueToken";

// // Email options
// const mailOptions = {
//   from: process.env.MAIL_USER,  // Sender's email
//   to: "user@example.com",       // Recipient's email
//   subject: "Password Reset",    // Subject of the email
//   html: resetPasswordEmailTemplate(resetToken),  // The email content, generated from the template
// };

// // Send the email
// try {
//   await sendEmail(mailOptions);
//   console.log("Password reset email sent successfully");
// } catch (error) {
//   console.error("Failed to send password reset email:", error);
// }
