const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError } = require("../helpers");

/**
 * @swagger
 * components:
 *   schemas:
 *     TokenRequest:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgxMjkyZGYzMjI3NWE2ZTMzOTU1YzAiLCJpYXQiOjE2Njk0MTU1OTIsImV4cCI6MTY3MjAwNzU5Mn0.UCBSAIW9RkIFA55kS7U3ZdNcNzprOTcjf0BDFv1q1MY
 *     TokenResponse:
 *       type: object
 *       properties:
 *         newAccessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgxMjkyZGYzMjI3NWE2ZTMzOTU1YzAiLCJpYXQiOjE2Njk0MTU4MTgsImV4cCI6MTY2OTQxNjExOH0.ASP2PlkOnejm1Qq6DiwLG5tlQ1NgFRC8tgo77Oa3a7M
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgxMjkyZGYzMjI3NWE2ZTMzOTU1YzAiLCJpYXQiOjE2Njk0MTU4MTgsImV4cCI6MTY3MjAwNzgxOH0.nWIc9GJ-oNjIK_GZeF9xiA1Z6YVUcS8xz_IzT-tLdmc
 */

const tokenSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

tokenSchema.post("save", handleSaveError);

const Token = model("token", tokenSchema);

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const tokenJoiSchema = {
  refreshTokenSchema,
};

module.exports = {
  Token,
  tokenJoiSchema,
};
