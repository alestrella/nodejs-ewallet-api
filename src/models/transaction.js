const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSaveError } = require("../helpers");

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTransactionRequest:
 *       type: object
 *       required:
 *         - income
 *         - sum
 *       properties:
 *         income:
 *           type: boolean
 *           description: Income or expense type of transaction.
 *           example: false
 *         comment:
 *           type: string
 *           description: Transaction description.
 *           example: Robot vacuum
 *         category:
 *           type: object
 *           description: If an expense transaction add these values
 *           properties:
 *             is:
 *               type: boolean
 *               example: true
 *             then:
 *               type: string
 *               length: 24
 *             otherwise:
 *               type: string
 *               minLength: 24
 *               description: Required for an expense transaction
 *         sum:
 *           type: integer
 *           description: Transaction amount
 *           example: 15000
 *
 *     CreateTransactionResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Backend-generated unique identifier.
 *           example: 63599b9170efca38e2a996ed
 *         date:
 *           type: string
 *           description: Transaction creation date
 *           example: 2022-11-20T18:28:17.909+00:00
 *         income:
 *           type: boolean
 *           description: Income or expense type of transaction.
 *           example: false
 *         comment:
 *           type: string
 *           description: Transaction description.
 *           example: Robot vacuum
 *         category:
 *           type: string
 *           description: Category ID.
 *           example: 63599b9170efca38e2a996ed
 *         sum:
 *           type: integer
 *           description: Transaction amount
 *           example: 15000
 *         balance:
 *           type: integer
 *           description: Total balance after this transaction
 *           example: 24000
 *
 *     TransactionsResponse:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         totalPages:
 *           type: integer
 *           example: 13
 *         totalBalance:
 *           type: integer
 *           example: 24000
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateTransactionResponse'
 */

const transactionMongooseSchema = new Schema(
  {
    income: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: String,
      default: "",
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: "category",
      required: true,
    },
    sum: {
      type: Number,
      required: [true, "Please, enter a sum of transaction"],
    },
    balance: {
      type: Number,
      required: [true, "No balance attached"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

transactionMongooseSchema.post("save", handleSaveError);

const Transaction = model("transaction", transactionMongooseSchema);

// ------------------------------- joi schemas start -------------------------------
const Joi = require("joi");

const addTransactionSchema = Joi.object({
  income: Joi.boolean().required(),
  comment: Joi.string().allow(""),
  category: Joi.alternatives().conditional("income", {
    is: true,
    then: Joi.string().hex().length(24),
    otherwise: Joi.string().hex().length(24).required(),
  }),
  sum: Joi.number().required(),
});

const transactionJoiSchemas = {
  addTransactionSchema,
};
// ------------------------------- joi schemas end ---------------------------------

module.exports = {
  Transaction,
  transactionJoiSchemas,
};
