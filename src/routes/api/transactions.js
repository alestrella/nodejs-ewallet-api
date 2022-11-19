const express = require("express");
const router = express.Router();

const ctrlTransactions = require("../../controllers/transactions");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validator } = require("../../middlewares");
// const isLoggedIn = require("../../middlewares");
const { transactionJoiSchemas } = require("../../models/transaction");

router.get(
  "/",
  // isLoggedIn,
  //fake log func
  (req, res, next) => {
    req.user = {
      _id: "123456789012345678901234",
      username: "tester",
      email: "email@email.xx",
    };
    next();
  },
  ctrlWrapper(ctrlTransactions.getTransactions)
);

router.post(
  "/",
  //   isLoggedIn,
  validator(transactionJoiSchemas.addTransactionSchema),
  //fake log func
  (req, res, next) => {
    req.user = {
      _id: "123456789012345678901234",
      username: "tester",
      email: "email@email.xx",
    };
    next();
  },
  ctrlWrapper(ctrlTransactions.addTransaction)
);

router.delete(
  "/:transactionId",
  //   isLoggedIn,
  ctrlWrapper(ctrlTransactions.deleteTransaction)
);

module.exports = router;
