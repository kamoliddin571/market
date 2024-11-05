const Joi = require("joi");

const registerDto = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
  fullName: Joi.string().optional(),
  age: Joi.number().min(7).optional(),
});

module.exports = { registerDto };
