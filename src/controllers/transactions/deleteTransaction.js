const { requestError } = require("../../helpers");
const { Transaction } = require("../../models/transaction");
const recalculateBalance = require("./recalculateBalance");

const deleteTransaction = async (req, res) => {
  const { _id: owner } = req.user;
  const id = req.params.transactionId;
  const transaction = await Transaction.findByIdAndDelete(id);
  if (!transaction) {
    throw requestError(404, "Not found");
  }
  if (transaction) {
    const correction = transaction.income ? -transaction.sum : transaction.sum;
    recalculateBalance(owner, transaction.createdAt, correction);
  }
  res.status(200).json({ id, message: "Transaction deleted" });
};

module.exports = deleteTransaction;
