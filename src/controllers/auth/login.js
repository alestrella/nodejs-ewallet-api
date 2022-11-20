const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");

const { User } = require("../../models/user");

const { requestError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  console.log(passwordCompare);

  if (!user || !passwordCompare) {
    throw requestError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = login;
