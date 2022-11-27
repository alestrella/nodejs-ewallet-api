const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSaveError } = require("../helpers");

/**
 * @swagger
 * components:
 *  schemas:
 *    CategoriesResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: Backend-generated unique identifier.
 *          example: '63599b9170efca38e2a996ed'
 *        name:
 *          type: string
 *          description: Category's name
 *          example: Products
 *        type:
 *          type: string
 *          description: Type of transaction: income or expense
 *          example: expense
 */

const categoryMongooseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "No category name"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Category has no type"],
    },
  },
  { versionKey: false, timestamps: false }
);

categoryMongooseSchema.post("save", handleSaveError);

const Category = model("category", categoryMongooseSchema);

module.exports = {
  Category,
};
