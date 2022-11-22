const axios = require("axios");

const convertFunction = ({ ccy, buy, sell }) => ({
  code: ccy,
  buy,
  sell,
});

const getCurrencyPrivat = (query) => async () => {
  axios.defaults.baseURL = "https://api.privatbank.ua/p24api/pubinfo";
  try {
    const { data } = await axios.get(query);
    const resultData = data.map(convertFunction);
    return resultData;
  } catch (err) {
    throw err;
  }
};

const getCashCurrency = getCurrencyPrivat("?exchange&coursid=5");

const getCashlessCurrency = getCurrencyPrivat("?exchange&coursid=11");

module.exports = {
  getCashCurrency,
  getCashlessCurrency,
};
