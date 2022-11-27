const { Transaction } = require("../../models/transaction");
const moment = require("moment");

const getGroupsByCategory = async (owner, startPoint, endPoint, income) => {
  const stats = await Transaction.aggregate([
    {
      $match: {
        owner,
        income,
        createdAt: {
          $gte: startPoint,
          $lt: endPoint,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        categorySum: { $sum: "$sum" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalSum: "$categorySum",
      },
    },
  ]);
  return stats;
};

const getStats = async (req, res) => {
  const { _id: owner } = req.user;
  const now = Date().toString();
  const { from, till = now } = req.query;
  const startPoint = new Date(moment(from));
  const endPoint = new Date(moment(till));
  console.log("time:", from, till, startPoint, endPoint);
  const income = await getGroupsByCategory(owner, startPoint, endPoint, true);
  const expense = await getGroupsByCategory(owner, startPoint, endPoint, false);
  res.status(200).json({ from: startPoint, till: endPoint, income, expense });
};

module.exports = getStats;
