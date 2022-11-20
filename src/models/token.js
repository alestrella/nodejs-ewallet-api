const { Schema, model } = require("mongoose");

// const { handleSaveError } = require("../helpers");

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

// tokenSchema.post("save", handleSaveError);

const Token = model("token", tokenSchema);

module.exports = { Token };
