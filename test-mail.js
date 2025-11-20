const nodemailer = require("nodemailer");

async function main() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // tu Gmail
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "sendabuena@gmail.com",
    subject: "Prueba de Nodemailer con App Password",
    text: "Este es un correo de prueba enviado desde Node.js usando Gmail App Password.",
  });

  console.log("Mensaje enviado:", info.messageId);
}

main().catch(console.error);
