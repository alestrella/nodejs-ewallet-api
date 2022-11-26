const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrlUsers = require("../../controllers/users");

const { isLoggedIn } = require("../../middlewares");

const router = express.Router();

/**
 * @swagger
 * /users/current:
 *  get:
 *   tags:
 *     - Users
 *   summary: Get current user's information by access token
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     description: Requires authentication token
 *     required: true
 *   responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserCurrentResponse'
 *      '401':
 *        description: Unauthorized (invalid access token)
 *      '404':
 *        description: Invalid user / Invalid session
 */

router.get("/current", isLoggedIn, ctrlWrapper(ctrlUsers.getCurrent));

module.exports = router;
