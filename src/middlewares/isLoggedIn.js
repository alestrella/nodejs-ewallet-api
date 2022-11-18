const jwt = require("jsonwebtoken");

const { requestError } = require("../helpers");

const { User } = require("../models/userModel");

const { SECRET_KEY } = process.env;

const isLoggedIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      next(requestError(401, "Not authorized"));
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      next(requestError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(3);
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = isLoggedIn;
