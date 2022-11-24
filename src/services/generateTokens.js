const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../config/vars");

const { requestError } = require("../helpers");

const { Token } = require("../models/token");

const generateTokens = async (user) => {
  try {
    const payload = { id: user._id };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });

    const userId = user._id;

    const tokenData = await Token.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    console.log(tokenData);
    const newRefreshToken = await Token.create({ userId, refreshToken });
    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw error;
  }
};

const verifyRefreshToken = async (refreshToken) => {
  const currentToken = await Token.findOne({ refreshToken });
  if (!currentToken) {
    throw requestError(404, "Invalid refresh token");
  }

  const decodedToken = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

  if (!decodedToken) {
    return { error: true, message: "Invalid refresh token" };
  }
  return { decodedToken, message: "Valid refresh token" };
};

module.exports = {
  generateTokens,
  verifyRefreshToken,
};
