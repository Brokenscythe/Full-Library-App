import nodemailer from "nodemailer";
 const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "cortexprojectlibrary@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
}); 

/* const transport = nodemailer.createTransport({
  host: 'mail.t-com.me',
  port: 587,
  secure: false, // staviti true ako SMTP server zahtjeva "secure connection"
  auth: {
    user: 'cortexprojectlibrary@gmail.com',
    pass: 'your-email-password',
  },
}); */

transport.verify(function (error) {
  if (error) {
    console.error("Error connecting to email service:", error);
  } else {
    console.log("Connected to email service.");
  }
});

transport.on("error", function (error) {
  console.error("Email transport error:", error);
});

export default transport;
