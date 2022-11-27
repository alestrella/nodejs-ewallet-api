const { User } = require("../../models/user");
const { Token } = require("../../models/token");

const logout = async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(userId, { accessToken: null });

  res.status(204);
};

module.exports = logout;
