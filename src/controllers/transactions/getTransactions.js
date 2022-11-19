const { Transaction } = require("../../models/transaction");
const getBalance = require("./getBalance");

const getTransactions = async (req, res) => {
  const { _id: owner } = req.user;
  const { pageNumber = null } = req.params;
  const { page = null, limit = 10 } = req.query;
  const pageParams = {};
  if (page) {
    pageParams.skip = (page - 1) * limit;
    pageParams.limit = limit;
  }
  const searchQuery = { owner };
  const data = await Transaction.find(
    searchQuery,
    "-updatedAt",
    pageParams
  ).sort({ createdAt: -1 });
  console.log("data", data);
  const transactions = data.map(
    ({ _id, income, comment, category, sum, balance, createdAt }) => ({
      id: _id,
      date: createdAt,
      income,
      comment,
      category,
      sum,
      balance,
    })
  );
  const totalBalance = await getBalance(owner);
  const count = await Transaction.count();
  const totalPages = Math.ceil(count / limit);
  const resData = { page, totalPages, totalBalance, transactions };
  res.status(200).json(resData);
};

module.exports = getTransactions;
