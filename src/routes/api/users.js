const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");

const { isLoggedIn } = require("../../middlewares");
// const { schemas } = require("../../models/user");

const router = express.Router();

router.get("/current", isLoggedIn, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
