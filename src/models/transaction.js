const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSaveError } = require("../helpers");

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
  category: Joi.string().hex().length(24), // ObjectID format
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
