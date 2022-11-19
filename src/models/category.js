const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSaveError } = require("../helpers");

const categoryMongooseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "No category name"],
    },
  },
  { versionKey: false, timestamps: false }
);

categoryMongooseSchema.post("save", handleSaveError);

const Category = model("category", categoryMongooseSchema);

module.exports = {
  Category,
};
