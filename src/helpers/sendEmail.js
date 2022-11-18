const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, MAIN_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationLink) => {
  const mail = {
    to: email,
    from: MAIN_EMAIL,
    subject: "Confirm Your Email",
    text: `To confirm your email address, please click on the following link: <a target="_blank" href="${verificationLink}">${verificationLink}</a>`,
    html: `<p>To confirm your email address, please click on the following link: <a target="_blank" href="${verificationLink}">${verificationLink}</a></p>`,
  };

  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
