const express = require("express");
const router = express.Router();

// const ctrlTransactions = require("../../controllers/transactions");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
// const validate = require("../../middleware/validate");
// const isLoggedIn = require("../../middlewares");
const { mockFunction } = require("../../controllers/mockController");

router.get(
  "/",
  // isLoggedIn,
  ctrlWrapper(mockFunction)
);

router.get(
  "/:pageNumber",
  // isLoggedIn,
  ctrlWrapper(mockFunction)
);

router.post(
  "/",
  //   isLoggedIn,
  //   validate(addTransactionSchema),
  ctrlWrapper((req, res) => {
    res.status(200).json({ message: "post done" });
  })
);

router.delete(
  "/:transactionId",
  //   isLoggedIn,
  ctrlWrapper((req, res) => {
    res.status(200).json({ message: "delete done" });
  })
);

module.exports = router;
