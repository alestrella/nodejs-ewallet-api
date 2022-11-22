const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSaveError } = require("../helpers");

/**
 * @swagger
 * components:
 *   schemas:
 *     CurrencyResponse:
 *      type: object
 *      properties:
 *        code:
 *          type: string
 *          required: true
 *          description: Backend-generated unique identifier.
 *          example: 'EUR'
 *        buy:
 *          type: integer
 *          example: 39.8
 *        sell:
 *          type: integer
 *          example: 40.1
 *        _id:
 *          type: string
 *          example: '63599b9170efca38e2a996ed'
 *
 */

const currencyMongooseSchema = new Schema(
  {
    cash: { type: Boolean, default: false },
    record: [
      {
        code: {
          type: String,
          required: [true, "No currency code"],
        },
        buy: { type: Number, required: true },
        sell: { type: Number, required: true },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

currencyMongooseSchema.post("save", handleSaveError);

const Currency = model("currency", currencyMongooseSchema);

module.exports = {
  Currency,
};
