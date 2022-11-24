const { Token } = require("../../models/token");
const { verifyRefreshToken } = require("../../services/generateTokens");

const refreshToken = async (req, res) => {
  const { refreshToken } = req;
  await verifyRefreshToken(refreshToken);
};

module.exports = { refreshToken };
