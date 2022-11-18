const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");

// const { validator, isLoggedIn } = require("../../middlewares");
// const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", () => {});

router.get("/verify/:verificationToken", () => {});

router.post("/verify", () => {});

router.post("/login", () => {});

router.get("/current", () => {});

router.get("/logout", () => {});

module.exports = router;
