const Joi = require("joi");

const changePaaswordDto = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).max(15).required(),
  confirmNewPassword: Joi.ref("newPassword"),
}).with("newPassword", "confirmNewPassword");

module.exports = { changePaaswordDto };
