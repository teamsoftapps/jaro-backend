const nodemailer = require("nodemailer");

const sendEmail = (email, link) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,

    auth: {
      user: "jarotransport80@gmail.com",
      pass: "fctavldvyyotpzmo",
    },
  });

  const mailOptions = {
    from: "jarotransport80@gmail.com",
    to: email,
    subject: "Reset Password Link - JARO Admin Web",
    text: `Reset Password Link ${link}`,
    message: link,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent Sucessfully!");
    }
  });
};

module.exports = sendEmail;
