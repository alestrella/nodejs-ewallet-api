const jwt = require("jsonwebtoken");

const { REFRESH_SECRET_KEY } = require("../config/vars");

const { requestError } = require("../helpers");

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const isValid = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    if (!isValid) {
      throw requestError(400, "Invalid refresh token");
    }
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw requestError(401, "Token exipred!");
    }
    next(error);
  }
};

module.exports = verifyRefreshToken;
