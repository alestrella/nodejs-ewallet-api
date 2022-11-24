const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError } = require("../helpers");

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400,
  }, // 30 days
});

tokenSchema.post("save", handleSaveError);

const Token = model("token", tokenSchema);

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().label("Refresh Token"),
});

const tokenJoiSchema = {
  refreshTokenSchema,
};

module.exports = {
  Token,
  tokenJoiSchema,
};
