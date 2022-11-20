const { Transaction } = require("../../models/transaction");
const getBalance = require("./getBalance");

const addTransaction = async (req, res) => {
  const { _id: owner } = req.user;
  const body = req.body;
  let balance = await getBalance(owner);
  balance = body.income ? balance + body.sum : balance - body.sum;
  const { _id, income, comment, category, sum, createdAt } =
    await Transaction.create({ ...body, owner, balance });
  const resData = {
    id: _id,
    date: createdAt,
    income,
    comment,
    category,
    sum,
    balance,
  };
  res.status(201).json(resData);
};

module.exports = addTransaction;
