const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { BASE_URL, SENDGRID_API_KEY, MAIN_EMAIL } = require("../config/vars");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (user) => {
  const dashboardLink = `/dashboard`;
  const { email, username } = user;
  const mail = {
    to: email,
    from: MAIN_EMAIL,
    subject: "Welcome to Xtodo Wallet",
    text: `To confirm your email address, please click on the following link: <a target="_blank" href="${dashboardLink}">Go to </a>`,
    html: `<h2></h2><p>To confirm your email address, please click on the following link: <a target="_blank" href="${dashboardLink}">${verificationLink}</a></p>`,
  };

  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
