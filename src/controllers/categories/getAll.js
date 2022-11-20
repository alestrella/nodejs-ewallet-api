const { Category } = require("../../models/category");

const getAll = async (req, res) => {
  const filter = {};
  const data = await Category.find(filter);
  const resData = data.map((rec) => ({
    id: rec._id,
    name: rec.name,
  }));
  res.status(200).json(resData);
};

module.exports = getAll;
