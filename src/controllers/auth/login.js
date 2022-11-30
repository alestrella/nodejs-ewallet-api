const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { requestError } = require("../../helpers");
const { updateTokens } = require("../../services/updateTokens");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!user || !passwordCompare) {
    throw requestError(401, "Email or password is wrong");
  }
  const userId = user._id;
  const tokens = await updateTokens(userId);

  res.json({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: {
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = login;
