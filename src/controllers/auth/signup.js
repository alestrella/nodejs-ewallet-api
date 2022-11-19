const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");

const { User } = require("../../models/user");

const { requestError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashPassword,
    name,
  });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: {
      email: user.email,
      name: user.name,
      balance: user.balance,
    },
  });
};

module.exports = signup;
