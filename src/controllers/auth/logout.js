const { User } = require("../../models/user");
const { Token } = require("../../models/token");

const { requestError } = require("../../helpers");

const logout = async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(userId, { accessToken: null });

  const userRefreshToken = await Token.findOne({ userId });
  if (!userRefreshToken) {
    throw requestError(204);
  }
  await Token.findByIdAndUpdate(userRefreshToken._id, { refreshToken: null });

  res.status(204);
};

module.exports = logout;
