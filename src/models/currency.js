const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSaveError } = require("../helpers");

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
