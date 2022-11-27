const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../config/vars");

const generateTokens = async (userId) => {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET_KEY, {
    expiresIn: "10m",
  });

  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
