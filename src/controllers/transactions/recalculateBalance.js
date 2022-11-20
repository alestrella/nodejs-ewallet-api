const { Transaction } = require("../../models/transaction");

const recalculateBalance = async (owner, date, correction) => {
  // recalculate collection after the data
  console.log("recalculation function running from ", date);
  const result = await Transaction.updateMany(
    {
      $match: {
        owner,
        _createdAt: { $gt: date },
      },
    },
    { $set: { balance: { $add: { balance, correction } } } }
  );
  return result;
};

module.exports = recalculateBalance;
