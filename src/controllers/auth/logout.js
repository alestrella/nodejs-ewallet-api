const { Token } = require("../../models/token");
const { User } = require("../../models/user");

const logout = async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndUpdate(userId, { accessToken: null });
  await Token.findOneAndUpdate({ userId }, { refreshToken: null });

  res.status(204).json({ message: "Logged out" });
};

module.exports = logout;
