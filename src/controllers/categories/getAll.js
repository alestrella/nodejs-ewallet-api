const { Category } = require("../../models/category");

const getAll = async (req, res) => {
  const data = await Category.find({});
  const resData = data.map((rec) => ({
    id: rec._id,
    name: rec.name,
    type: rec.type,
  }));
  res.status(200).json(resData);
};

module.exports = getAll;
