require("dotenv").config();

const { DB_HOST = "", PORT = 4000, SECRET_KEY } = process.env;

module.exports = { PORT, DB_HOST, SECRET_KEY };
