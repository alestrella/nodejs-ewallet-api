/**
 * @swagger
 * components:
 *   schemas:
 *     IncomeStaticticsResponse:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           example: 6382834bc32542e79a29bf55
 *         totalSum:
 *           type: string
 *           example: 15000
 *
 *     ExpenseStaticticsResponse:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           example: 6378db057f1022fdac49bdec
 *         totalSum:
 *           type: string
 *           example: 28000
 */

const Joi = require("joi");

const getStatsSchema = Joi.object({
  from: Joi.date().required(),
  till: Joi.date(),
});

const statsJoiSchemas = {
  getStatsSchema,
};

module.exports = {
  statsJoiSchemas,
};
