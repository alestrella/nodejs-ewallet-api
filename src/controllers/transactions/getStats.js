const { Transaction } = require("../../models/transaction");
const moment = require("moment");

const getStats = async (req, res) => {
  const { _id: owner } = req.user;
  const now = Date().toString();
  const { from, till = now } = req.query;
  const startPoint = new Date(moment(from));
  const endPoint = new Date(moment(till));
  console.log("time:", from, till, startPoint, endPoint);
  const stats = await Transaction.aggregate([
    {
      $match: {
        owner,
        createdAt: {
          $gte: startPoint,
          $lte: endPoint,
        },
      },
    },
    {
      $group: {
        _id: "$category._id",
        categorySum: { $sum: "$sum" },
      },
    },
    {
      $project: { _id: 0, category: "$_id.category", totalSum: "$totalSum" },
    },
  ]);
  res.status(200).json({ from: startPoint, till: endPoint, categories: stats });
};

module.exports = getStats;
