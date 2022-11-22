const express = require("express");
const router = express.Router();

const { getCurrency } = require("../../controllers/currency");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

/**
 * @swagger
 * /currency:
 *  get:
 *   tags:
 *     - Currency
 *   summary: Get exchange rate from Privat bank API
 *   parameters:
 *     - in: query
 *       name: type
 *       description: Without type returns cashless currency by default
 *       example: cash or cashless
 *   responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CurrencyResponse'
 *      '400':
 *         description: Bad request ( type parameter must be cash or cashless )
 *      '500':
 *         description: Server error
 */

router.get("/", ctrlWrapper(getCurrency));

module.exports = router;
