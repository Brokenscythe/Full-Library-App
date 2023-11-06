import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "cortexprojectlibrary@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

export default transport;
