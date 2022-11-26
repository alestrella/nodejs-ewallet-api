const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { getAll } = require("../../controllers/categories");

/**
 * @swagger
 * /categories:
 *  get:
 *   tags:
 *     - Categories
 *   summary: Get all transaction categories
 *   responses:
 *      '201':
 *         content:
 *          application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/CategoriesResponse'
 *      '500':
 *         description: Server error
 */

router.get("/", ctrlWrapper(getAll));

module.exports = router;
