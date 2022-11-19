const { Transaction } = require("../../models/transaction");

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
  ).populate("owner", "email");
  const transactions = data.map((rec) => ({ ...rec, data: rec.createdAt }));
  const resData = { transactions };
  if (pageNumber) resData.page = Number(pageNumber);
  res.status(200).json(resData);
};

module.exports = getTransactions;
