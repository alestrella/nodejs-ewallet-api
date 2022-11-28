const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, MAIN_EMAIL } = require("../config/vars");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (user) => {
  const { email, username } = user;
  const mail = {
    to: email,
    from: {
      email: MAIN_EMAIL,
      name: "Wallet",
    },
    templateId: "d-ceceba7f3ab34f98a910fcad9d2b7b8c",
    subject: "Welcome to Wallet by Xtodo",
    dynamicTemplateData: {
      name: username,
    },
  };

  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
