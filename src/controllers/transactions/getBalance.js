const { Transaction } = require("../../models/transaction");

const getBalance = async (owner, date = null) => {
  const searchQuery = date
    ? { owner, operationDate: { $lt: date } }
    : { owner };
  const data = await Transaction.find(searchQuery)
    .sort({ operationDate: -1 })
    .limit(1);
  const balance = data.length > 0 ? data[0].balance : 0;
  return balance;
};

module.exports = getBalance;
