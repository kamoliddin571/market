const jwt = require("jsonwebtoken");
const { config } = require("../config/index");

class Jwt {
  #accessSecret;
  #refreshSecret;
  #forgotPasswordSecret;
  constructor(accessSecret, refreshSecret, forgotPasswordSecret) {
    this.#accessSecret = accessSecret;
    this.#refreshSecret = refreshSecret;
    this.#forgotPasswordSecret = forgotPasswordSecret;
  }

  generateAccess(userId) {
    return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      this.#accessSecret
    );
  }

  verifyAccess(token) {
    return jwt.verify(token, this.#accessSecret);
  }

  generateRefresh(userId) {
    return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2 },
      this.#refreshSecret
    );
  }

  verifyRefresh(token) {
    return jwt.verify(token, this.#refreshSecret);
  }

  generateForgotPassword(userId) {
    return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 2 },
      this.#forgotPasswordSecret
    );
  }

  verifyForgotPassword(token) {
    return jwt.verify(token, this.#forgotPasswordSecret);
  }
}

const myJwt = new Jwt(
  config.JWT_ACCESS_KEY,
  config.JWT_REFRESH_KEY,
  config.JWT_FORGOT_PASSWORD_KEY
);

module.exports = { myJwt };
