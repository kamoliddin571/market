const { CustomError } = require("./customError");

function validater(schema, dto) {
  const { error } = schema.validate(dto);
  if (error) {
    throw new CustomError(400, error.message);
  }
}

module.exports = { validater };
