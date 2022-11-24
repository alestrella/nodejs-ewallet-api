const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY } = require("../../config/vars");

const { User } = require("../../models/user");

const { requestError } = require("../../helpers");
// const { generateTokens, saveToken } = require("../../services/generateTokens");

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

  // const tokens = generateTokens({ id: user._id });
  // await saveToken(user._id);
  const payload = { id: user._id };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token: user.token,
    user: {
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = signup;
