const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, MAIN_EMAIL } = require("../config/vars");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (user) => {
  const dashboardLink = `/dashboard`;
  const { email, username } = user;
  const mail = {
    to: email,
    from: MAIN_EMAIL,
    subject: "Welcome to Wallet by Xtodo",
    text: `Hi ${username}. Thanks for signing up to Wallet app by XTodo! Now is the time to be smart with your money. So let's put your money to work! <a target="_blank" href="${dashboardLink}">Sign In </a>`,
  };

  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
