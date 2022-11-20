const { Transaction } = require("../../models/transaction");

const testQuery = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = null, limit = 10 } = req.query;
  const skip = page ? (page - 1) * limit : 0;
  const pageLength = page ? limit : 0;
  const searchQuery = { owner };
  const data = await Transaction.find(searchQuery, "-updatedAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageLength);

  const count = await Transaction.count();
  const totalPages = Math.ceil(count / limit);
  const resData = { page, totalPages, data };
  res.status(200).json(resData);
};

module.exports = testQuery;
