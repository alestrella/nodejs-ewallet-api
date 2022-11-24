const getCurrent = async (req, res) => {
  const { email, username } = req.user;
  res.status(200).json({ user: { email, username } });
};

module.exports = getCurrent;
