const Joi = require("joi");

const notificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  userId: Joi.string().optional(),
  isGlobal: Joi.boolean().required(),
});

module.exports = { notificationSchema };
