const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { requestError, sendEmail } = require("../../helpers");
const { updateTokens } = require("../../services/updateTokens");

const signup = async (req, res) => {
  const { email, password, username } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    email,
    password: hashPassword,
    username,
  });
  const userId = user._id;
  const tokens = await updateTokens(userId);
  await sendEmail(user);

  res.status(201).json({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: {
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = signup;
