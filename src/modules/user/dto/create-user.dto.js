const Joi = require("joi");

const userCreateDto = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
  fullName: Joi.string().optional(),
  age: Joi.number().min(7).optional(),
  role: Joi.string().required().valid("admin", "client", "manager", "clerk"),
});

module.exports = { userCreateDto };
