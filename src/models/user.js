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
 *         - email
 *         - password
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           description: The user's name.
 *           example: Rick Sanchez
 *         email:
 *           type: string
 *           format: email
 *           description: User's email.
 *           example: rick@mail.com
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 16
 *           description: The user's password.
 *           example: examplepwd12345
 *     UserSignupResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Session's access token (needed for all requests)
 *           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDhjMzliNmU1MmQ1MWFlZWFiY2MzMyIsImlhdCI6MTY0ODkzNzY1OSwiZXhwIjoxNjQ5MDI0MDU5fQ.R_xVuzsK9Nzs9sj98Lk1lidJB27xDUjhYBOiPU-_fmY'
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: rick@mail.com
 *             username:
 *               type: string
 *               example: Rick Sanchez
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
 *           format: email
 *           example: rick@mail.com
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 16
 *           description: The user's password.
 *           example: examplepwd12345
 *     UserAuthResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Session's access token (needed for all requests)
 *           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDhjMzliNmU1MmQ1MWFlZWFiY2MzMyIsImlhdCI6MTY0ODkzNzY1OSwiZXhwIjoxNjQ5MDI0MDU5fQ.R_xVuzsK9Nzs9sj98Lk1lidJB27xDUjhYBOiPU-_fmY'
 *         refreshToken:
 *           type: string
 *           description: Session's refresh token (needed for /auth/refresh)
 *           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2QxZDdjMzJmZGU2MTAyNWQ0MTE4ZCIsImVtYWlsIjoiczRiYXRpbkBnbWFpbC5jb20iLCJpYXQiOjE2NjkyMjc5MjAsImV4cCI6MTY2OTMxNDMyMH0.hWUFZTTmG-LgLaDCR87QZuKNFc0p9F-pZTLAYxPBn2k'
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: rick@mail.com
 *             username:
 *               type: string
 *               example: Rick Sanchez
 *     UserCurrentResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: rick@mail.com
 *             username:
 *               type: string
 *               example: Rick Sanchez
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
    accessToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

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

module.exports = {
  User,
  schemas,
};
