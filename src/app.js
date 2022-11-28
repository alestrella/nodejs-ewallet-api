const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const transactionsRouter = require("./routes/api/transactions");
const categoriesRouter = require("./routes/api/categories");
const currencyRouter = require("./routes/api/currency");

const app = express();

const format = app.get("env") === "development" ? "dev" : "short";

app.use(logger(format));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/link", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);
app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/currency", currencyRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
