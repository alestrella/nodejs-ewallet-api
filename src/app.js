const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const authRouter = require("./routes/api/auth");
const transactionsRouter = require("./routes/api/transactions");
const categoriesRouter = require("./routes/api/categories");

const app = express();

const format = app.get("env") === "development" ? "dev" : "short";

app.use(logger(format));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoriesRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
