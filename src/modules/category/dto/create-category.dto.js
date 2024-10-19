const Joi = require("joi");

const userSchema = Joi.object({
  login: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(1).max(100).required(),
});

module.exports = { userSchema };
