const express = require("express");
const router = express.Router();

const ctrlTransactions = require("../../controllers/transactions");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validator, isLoggedIn } = require("../../middlewares");
const { transactionJoiSchemas } = require("../../models/transaction");

router.get("/", isLoggedIn, ctrlWrapper(ctrlTransactions.getTransactions));

router.post(
  "/",
  isLoggedIn,
  validator(transactionJoiSchemas.addTransactionSchema),
  ctrlWrapper(ctrlTransactions.addTransaction)
);

router.delete(
  "/:transactionId",
  isLoggedIn,
  ctrlWrapper(ctrlTransactions.deleteTransaction)
);

module.exports = router;
