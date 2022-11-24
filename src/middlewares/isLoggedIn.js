const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY } = require("../config/vars");

const { requestError } = require("../helpers");

const { User } = require("../models/user");

const isLoggedIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw requestError(401);
    }
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
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
