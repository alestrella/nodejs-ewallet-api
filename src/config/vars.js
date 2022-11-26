require("dotenv").config();

const {
  DB_HOST = "",
  PORT = 4000,
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  SENDGRID_API_KEY,
  MAIN_EMAIL,
} = process.env;

module.exports = {
  DB_HOST,
  PORT,
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  SENDGRID_API_KEY,
  MAIN_EMAIL,
};
