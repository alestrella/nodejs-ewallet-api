const { Token } = require("../../models/token");

const { requestError } = require("../../helpers");
const { updateTokens } = require("../../services/updateTokens");

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const tokenData = await Token.findOne({ refreshToken });
  if (!tokenData) {
    throw requestError(404, "Invalid user / Invalid session");
  }
  const newTokens = await updateTokens(tokenData.userId);

  res.json({
    newAaccessToken: newTokens.accessToken,
    refreshToken: refreshToken,
  });
};

module.exports = refreshToken;
