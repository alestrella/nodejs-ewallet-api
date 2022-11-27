const { User } = require("../models/user");
const { Token } = require("../models/token");

const { generateTokens } = require("../helpers");

// const updateDbRefreshTokens = async (userId, refreshToken) => {
//   const tokenData = await Token.findOne({ userId });
//   if (!tokenData) {
//     return await Token.create({ userId, refreshToken });
//   }
//   return await Token.findByIdAndUpdate(
//     tokenData._id,
//     { refreshToken },
//     { new: true }
//   );
//   return;
// };

const updateTokens = async (userId) => {
  const { accessToken, refreshToken } = await generateTokens(userId);

  await User.findByIdAndUpdate(userId, { accessToken });

  const refreshTokenData = await Token.findOne({ userId });
  if (!refreshTokenData) {
    await Token.create({ userId, refreshToken });
    return { accessToken, refreshToken };
  }
  // await updateDbRefreshTokens(userId, refreshToken);

  return { accessToken, refreshToken };
};

module.exports = {
  // updateDbRefreshTokens,
  updateTokens,
};
