const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");

const { validator, isLoggedIn } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validator(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/login", () => {});

router.get("/logout", () => {});

module.exports = router;
