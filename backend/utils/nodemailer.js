import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "email-smtp.ap-southeast-2.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SMTP_USERNAME,
    pass: process.env.AWS_SMTP_PASSWORD,
  },
});

export default transporter;
