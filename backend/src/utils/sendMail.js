const nodemailer = require("nodemailer");
import createHttpError from "http-errors";
import { envVariables } from "../configs";
const { nodemailerEmail, nodemailerPassword } = envVariables;
export const sendEmail = async (receiver, subject, content, html) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: nodemailerEmail,
        pass: nodemailerPassword,
      },
    });
    const message = await transporter.sendMail({
      from: nodemailerEmail,
      to: receiver,
      subject,
      text: content,
      html,
    });
    console.log("Message sent: ", message.messageId);
  } catch (error) {
    throw createHttpError(500, error);
  }
};
