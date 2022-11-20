const { Transaction } = require("../../models/transaction");

const getBalance = async (owner) => {
  const searchQuery = { owner };
  const data = await Transaction.find(searchQuery)
    .limit(1)
    .sort({ createdAt: -1 });
  const balance = data.length > 0 ? data[0].balance : 0;
  return balance;
};

module.exports = getBalance;
