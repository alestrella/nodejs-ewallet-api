const { Transaction } = require("../../models/transaction");

const recalculateBalance = async (owner, date, correction) => {
  // recalculate collection after the data
  console.log("recalculation function running from ", date);
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner,
          createdAt: { $gt: date },
        },
      },
      {
        $project: {
          _id: "$_id",
          category: "$category",
          income: "$income",
          comment: "$comment",
          sum: "$sum",
          balance: { $sum: ["$balance", correction] },
          createdAt: "$createdAt",
        },
      },
      {
        $merge: {
          into: "transactions",
          on: "_id",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
    ]);
    return 1;
  } catch (err) {
    throw err;
  }
};

module.exports = recalculateBalance;
