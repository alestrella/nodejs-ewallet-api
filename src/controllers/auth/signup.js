const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY } = require("../../config/vars");

const { User } = require("../../models/user");

const { requestError } = require("../../helpers");

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

  const payload = { userId: user._id };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, { accessToken });

  res.status(201).json({
    accessToken,
    user: {
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = signup;
