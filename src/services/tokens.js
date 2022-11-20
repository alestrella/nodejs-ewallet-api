const jwt = require("jsonwebtoken");

const { SECRET_KEY, REFRESH_SECRET_KEY } = require("../config");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "12h",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "15d",
  });
  return { accessToken, refreshToken };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await tokenModel.create({ user: userId, refreshToken });
  return token;
  await User.findByIdAndUpdate(userId, { token: accessToken });
};

module.exports = {
  generateTokens,
  saveToken,
};
