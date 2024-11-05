const { myJwt } = require("../../lib/jwt");
const { ResData } = require("../../lib/resData");

class AuthService {
  #jwt;
  constructor(jwt) {
    this.#jwt = jwt;
  }

  generateToken(user) {
    const acToken = this.#jwt.generateAccess(user._id);
    const refToken = this.#jwt.generateRefresh(user._id);

    const data = { user, tokens: { acToken, refToken } };

    return new ResData(200, "success", data);
  }

  generateForgotPasswordToken(user, message) {
    const token = this.#jwt.generateForgotPassword(user._id);

    return new ResData(200, message, token);
  }
}

const authService = new AuthService(myJwt);

module.exports = { authService };
