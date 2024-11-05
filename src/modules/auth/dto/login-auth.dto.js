const Joi = require("joi");

const loginDto = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { loginDto };
