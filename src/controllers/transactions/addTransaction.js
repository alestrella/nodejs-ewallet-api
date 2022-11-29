const { date } = require("joi");
const { Transaction } = require("../../models/transaction");
const getBalance = require("./getBalance");
const recalculateBalance = require("./recalculateBalance");

const addTransaction = async (req, res) => {
  const { _id: owner } = req.user;
  const body = req.body;
  const date = body.date || new Date().toISOString();
  let balance = await getBalance(owner, date);
  balance = body.income ? balance + body.sum : balance - body.sum;
  const transaction = await Transaction.create({
    ...body,
    category: body.category || "000000000000000000000000",
    owner,
    balance,
    operationDate: date,
  });
  const correction = transaction.income ? transaction.sum : -transaction.sum;
  await recalculateBalance(owner, transaction.operationDate, correction);
  const { _id, income, comment, category, sum, operationDate } = transaction;
  const resData = {
    id: _id,
    date: operationDate,
    income,
    comment,
    category,
    sum,
    balance,
  };
  res.status(201).json(resData);
};

module.exports = addTransaction;
