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
