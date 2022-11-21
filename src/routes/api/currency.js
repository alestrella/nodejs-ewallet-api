const express = require("express");
const router = express.Router();

const { getCurrency } = require("../../controllers/currency");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

router.get("/", ctrlWrapper(getCurrency));

module.exports = router;
