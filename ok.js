const { CustomError } = require("./src/lib/customError");

const Joi = require("joi");

const userSchema = Joi.object({
  login: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(1).max(100).required(),
});

const user1 = {
  login: "admin",
  password: "assalomualaykum",
  age: 20,
};

const user2 = {
  login: "userxecdxeczwsergbt4rg54g54gfrveerrftg",
  password: "xsdwveteedr4thytgrfedwsefrgthbt",
  age: 20,
};

const a = userSchema.validate(user2);

if (a.error) {
  throw new CustomError(400, a.error.message);
} else {
  console.log("ok");
}
