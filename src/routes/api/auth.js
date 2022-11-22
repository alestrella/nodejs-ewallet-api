const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrlAuth = require("../../controllers/auth");

const { validator, isLoggedIn } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Create new user
 *    requestBody:
 *      description: Registration's object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignupRequest'
 *    responses:
 *      '201':
 *        description: Created.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserAuthResponse'
 *      '400':
 *        description: Bad request (invalid request body).
 *      '409':
 *        description: Provided email already exists.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Email in use'
 */

router.post(
  "/signup",
  validator(schemas.signupSchema),
  ctrlWrapper(ctrlAuth.signup)
);

router.post(
  "/login",
  validator(schemas.loginSchema),
  ctrlWrapper(ctrlAuth.login)
);

router.get("/logout", isLoggedIn, ctrlWrapper(ctrlAuth.logout));

module.exports = router;
