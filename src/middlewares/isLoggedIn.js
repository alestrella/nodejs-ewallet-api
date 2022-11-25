const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY } = require("../config/vars");

const { requestError } = require("../helpers");

const { User } = require("../models/user");

const isLoggedIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, accessToken] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw requestError(401);
    }
    const { userId } = jwt.verify(accessToken, ACCESS_SECRET_KEY);

    const user = await User.findById(userId);

    if (!user || !user.accessToken || user.accessToken !== accessToken) {
      throw requestError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = isLoggedIn;
