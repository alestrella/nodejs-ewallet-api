const { requestError } = require("../../helpers");
const { Transaction } = require("../../models/transaction");
const recalculateBalance = require("./recalculateBalance");

const deleteTransaction = async (req, res) => {
  const id = req.params.transactionId;
  const transaction = await Transaction.findByIdAndDelete(id);
  if (!transaction) {
    throw requestError(404, "Not found");
  }
  if (transaction) {
    recalculateBalance(transaction.createdAt);
  }
  res.status(200).json({ id, message: "Transaction deleted" });
};

module.exports = deleteTransaction;
