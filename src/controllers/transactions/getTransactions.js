const { Transaction } = require("../../models/transaction");
const getBalance = require("./getBalance");

const getTransactions = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = null, limit = 10 } = req.query;
  const skip = +page ? (page - 1) * limit : 0;
  const pageLength = +page ? limit : 0;
  const searchQuery = { owner };
  const data = await Transaction.find(searchQuery, "-updatedAt")
    .sort({ operationDate: -1 })
    .skip(skip)
    .limit(pageLength);
  const transactions = data.map(
    ({ _id, income, comment, category, sum, balance, operationDate }) => ({
      id: _id,
      date: operationDate,
      income,
      comment,
      category,
      sum,
      balance,
    })
  );
  const totalBalance = await getBalance(owner);
  const count = await Transaction.count(searchQuery);
  const totalPages = Math.ceil(count / limit);
  const resData = { page: +page, totalPages, totalBalance, transactions };
  res.status(200).json(resData);
};

module.exports = getTransactions;
