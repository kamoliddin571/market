require("dotenv").config();
const Joi = require("joi");

const config = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
  DB_URL: process.env.DB_URL,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  JWT_FORGOT_PASSWORD_KEY: "dewgthr",
};

const configDto = Joi.object({
  SERVER_PORT: Joi.number().min(3000).max(9999).required(),
  JWT_ACCESS_KEY: Joi.string().min(3).required(),
  JWT_REFRESH_KEY: Joi.string().min(3).required(),
  DB_URL: Joi.string().required(),
  EMAIL: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  JWT_FORGOT_PASSWORD_KEY: Joi.string().required(),
});

module.exports = { config, configDto };
