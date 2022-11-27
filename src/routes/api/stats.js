const express = require("express");
const router = express.Router();

const ctrlTransactions = require("../../controllers/transactions");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validator, isLoggedIn } = require("../../middlewares");
const { tstatsJoiSchemas } = require("../../models/stats");

router.get("/", isLoggedIn, ctrlWrapper(ctrlTransactions.getStats));

module.exports = router;
