const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY } = require("../../config/vars");

const { User } = require("../../models/user");

const { requestError } = require("../../helpers");
const { generateTokens } = require("../../services/generateTokens");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!user || !passwordCompare) {
    throw requestError(401, "Email or password is wrong");
  }

  // const payload = { id: user._id };
  // const token = jwt.sign(payload, ACCESS_SECRET_KEY, {
  //   expiresIn: "1d",
  // });
  // await User.findByIdAndUpdate(user._id, { token });
  const { accessToken, refreshToken } = await generateTokens(user);

  res.json({
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = login;
