const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { getAll } = require("../../controllers/categories");

router.get("/", ctrlWrapper(getAll));

module.exports = router;
