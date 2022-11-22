const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError } = require("../helpers");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignupRequest:
 *       type: object
 *       required:
 *        - email
 *        - password
 *        - username
 *       properties:
 *         email:
 *           type: string
 *           description: User's email.
 *           example: rick@mail.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: examplepwd12345
 *         username:
 *           type: string
 *           description: The user's name.
 *           example: Rick Sanchez
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Backend-generated unique identifier.
 *               example: 63599b9170efca38e2a996ed
 *         - $ref: '#/components/schemas/UserSignupRequest'
 *     UserLoginRequest:
 *       type: object
 *       required:
 *        - email
 *        - password
 *        - username
 *       properties:
 *         email:
 *           type: string
 *           description: User's email.
 *           example: rick@mail.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: examplepwd12345
 */

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
    username: {
      type: String,
      minLenght: [3],
      required: [true, "Email is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).max(16).required(),
  username: Joi.string().min(3).required(),
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
