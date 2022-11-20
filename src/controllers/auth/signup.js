const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const { SECRET_KEY } = require("../../config");

const { User } = require("../../models/user");

const { requestError } = require("../../helpers");
const { generateTokens, saveToken } = require("../../services/tokens");

const signup = async (req, res) => {
  const { email, password, username } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashPassword,
    username,
  });

  // const token = jwt.sign({ id: user._id }, SECRET_KEY, {
  //   expiresIn: "1d",
  // });
  const tokens = generateTokens({ id: user._id });
  await saveToken(user._id);

  res.status(201).json({
    token: accessToken,
    user: {
      email: user.email,
      username: user.username,
      balance: user.balance,
    },
  });
};

module.exports = signup;
