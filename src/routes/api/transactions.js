const express = require("express");
const router = express.Router();

const ctrlTransactions = require("../../controllers/transactions");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validator, isLoggedIn } = require("../../middlewares");
const { transactionJoiSchemas } = require("../../models/transaction");

/**
 * @swagger
 * /transactions:
 *  post:
 *    tags:
 *      - Transactions
 *    summary: Create new transactions (requires authentication token)
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: Transaction's object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Request'
 *    responses:
 *      '201':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *      '400':
 *        description: Bad request (invalid request body).
 *      '401':
 *         description: Unauthorized (invalid access token)
 *      '404':
 *         description: Invalid user / Invalid session
 */

router.post(
  "/",
  isLoggedIn,
  validator(transactionJoiSchemas.addTransactionSchema),
  ctrlWrapper(ctrlTransactions.addTransaction)
);

/**
 * @swagger
 * /transactions:
 *  get:
 *   tags:
 *     - Transactions
 *   summary: Get all transactions by user
 *   security:
 *     - bearerAuth: []
 *   responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/TransactionsResponse'
 *      '401':
 *         description: Unauthorized (invalid access token)
 *      '404':
 *         description: Invalid user / Invalid session
 */

router.get("/", isLoggedIn, ctrlWrapper(ctrlTransactions.getTransactions));

/**
 * @swagger
 * /transactions/{transactionId}:
 *  delete:
 *   tags:
 *     - Transactions
 *   summary: Delete a user transaction
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *     - in: path
 *       name: transactionId
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/TransactionDeleteResponse'
 *      '401':
 *         description: Unauthorized (invalid access token)
 *      '404':
 *         description: Not found
 */

router.delete(
  "/:transactionId",
  isLoggedIn,
  ctrlWrapper(ctrlTransactions.deleteTransaction)
);

module.exports = router;
