require("dotenv").config();

const config = {
  serverPort: Number(process.env.PORT),
  jwtKey: process.env.JWT_KEY,
};

module.exports = { config };
