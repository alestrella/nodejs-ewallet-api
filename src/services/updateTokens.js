const { User } = require("../models/user");
const { Token } = require("../models/token");

const { generateTokens } = require("../helpers");

const updateTokens = async (userId) => {
  const { accessToken, refreshToken } = await generateTokens(userId);

  await User.findByIdAndUpdate(userId, { accessToken });

  const refreshTokenData = await Token.findOne({ userId });
  // if new user
  if (!refreshTokenData) {
    await Token.create({ userId, refreshToken });
    return { accessToken, refreshToken };
  }

  if (!refreshTokenData.refreshToken) {
    await Token.findByIdAndUpdate(
      refreshTokenData._id,
      { refreshToken },
      { new: true }
    );
    return { accessToken, refreshToken };
  }

  return { accessToken, refreshToken: refreshTokenData.refreshToken };
};

module.exports = {
  updateTokens,
};
