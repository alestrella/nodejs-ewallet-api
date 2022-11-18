require("dotenv").config();

const { DB_HOST = "", PORT = 3000 } = process.env;

module.exports = { PORT, DB_HOST };
