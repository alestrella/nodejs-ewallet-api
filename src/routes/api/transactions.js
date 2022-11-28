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
 *    summary: Create new transaction
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: Transaction's object (requires authentication token)
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTransactionRequest'
 *    responses:
 *      '201':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateTransactionResponse'
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
 *   summary: Get transactions by user
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: Returned search results are paginated. Use this parameter to select the page number (start from 1).
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
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: Transaction ID.
 *                  example: 63599b9170efca38e2a996ed
 *                message:
 *                  type: string
 *                  example: Transaction deleted
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

/**
 * @swagger
 * /transactions/statistics:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get statistics about user transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         description: Returned transaction statistics FROM the selected period
 *         example: 2022-11-28
 *         required: true
 *       - in: query
 *         name: till
 *         schema:
 *           type: string
 *         description: Returned transaction statistics TO the selected period (OPTIONAL)
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionsResponse'
 *       '401':
 *         description: Unauthorized (invalid access token)
 *       '404':
 *         description: Invalid user / Invalid session
 */

router.get("/", isLoggedIn, ctrlWrapper(ctrlTransactions.getStats));

module.exports = router;
