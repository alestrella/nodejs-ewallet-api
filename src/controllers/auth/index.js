const signup = require("../auth/signup");
const login = require("../auth/login");
const logout = require("../auth/logout");
const refreshToken = require("../auth/refreshToken");

module.exports = {
  signup,
  login,
  logout,
  refreshToken,
};
