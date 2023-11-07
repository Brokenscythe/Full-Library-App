import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "dusanivanoviri@gmail.com",
    pass: "40danadusaluta123!",
  },
});

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
