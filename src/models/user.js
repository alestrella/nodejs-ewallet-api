const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError } = require("../helpers");

const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      minLenght: [8, "Passwords must be at least 8 characters long."],
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      minLenght: [3],
      required: [true, "Email is required"],
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    //TODO: add categories
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).max(16).required(),
  confirmPassword: Joi.string().min(8).required().valid(Joi.ref("password")),
  name: Joi.string().min(3).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).max(16).required(),
});

const schemas = {
  signupSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
