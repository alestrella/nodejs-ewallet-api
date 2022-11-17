require("dotenv").config();

const { DB_URL = "", PORT = 3000 } = process.env;

module.exports = { PORT, DB_URL };
