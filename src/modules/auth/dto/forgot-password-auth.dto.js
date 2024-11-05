const Joi = require("joi");

const forgotPasswordDto = Joi.object({
  email: Joi.string().email().required(),
});

const verifyDto = Joi.object({
  code: Joi.string().min(4).max(4).required(),
});

const changeForgotPasswordDto = Joi.object({
  newPassword: Joi.string().min(8).max(15).required(),
  confirmNewPassword: Joi.ref("newPassword"),
}).with("newPassword", "confirmNewPassword");

module.exports = { forgotPasswordDto, verifyDto, changeForgotPasswordDto };
