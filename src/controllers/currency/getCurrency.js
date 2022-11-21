const { requestError } = require("../../helpers");
const { Currency } = require("../../models/currency");
const {
  getCashCurrency,
  getCashlessCurrency,
} = require("../../services/getCurrency");

const getCurrency = async (req, res) => {
  const { type = "cash" } = req.query; // "cash" for cash exchange rate, "cashless" for cashless
  if (!(type === "cash" || type === "cashless")) {
    throw requestError(
      400,
      'Bad request: type parameter must be "cash" or "cashless"'
    );
  }
  const cash = type === "cash" ? true : false;
  const currentCurrency = await Currency.findOne({ cash });
  if (currentCurrency) {
    const timeDiff = (new Date() - new Date(currentCurrency.updatedAt)) / 1000;
    if (timeDiff < 3600) {
      res.status(200).json(currentCurrency.record);
      return;
    }
  }
  let newCurrency;
  if (cash) {
    newCurrency = await getCashCurrency();
  } else {
    newCurrency = await getCashlessCurrency();
  }
  const resData = await Currency.findOneAndUpdate(
    { cash },
    { record: newCurrency },
    { upsert: true, returnDocument: "after" }
  );
  res.status(200).json(resData.record);
};

module.exports = getCurrency;
