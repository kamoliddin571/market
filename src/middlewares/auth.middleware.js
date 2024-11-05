const { CustomError } = require("../lib/customError");
const { myJwt } = require("../lib/jwt");
const { userService } = require("../modules/user/user.service");

class AuthMiddleware {
  #jwt;
  #userService;
  constructor(jwt, userService) {
    this.#jwt = jwt;
    this.#userService = userService;
  }

  async checkToken(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(401, "authorization is required");
      }

      const [type, tokenValue] = token.split(" ");

      if (type !== "Bearer" || !tokenValue) {
        throw new CustomError(401, "authorization type must be Bearer");
      }

      const { id } = this.#jwt.verifyAccess(tokenValue);

      const { data } = await this.#userService.getById(id);

      req.currentUser = data;
      next();
    } catch (error) {
      error.status = 401;
      next(error);
    }
  }
  async checkForgotPasswordToken(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(401, "authorization is required");
      }

      const [type, tokenValue] = token.split(" ");

      if (type !== "Bearer" || !tokenValue) {
        throw new CustomError(401, "authorization type must be Bearer");
      }

      const { id } = this.#jwt.verifyForgotPassword(tokenValue);

      const { data } = await this.#userService.getById(id);

      req.currentUser = data;
      next();
    } catch (error) {
      error.status = 401;
      next(error);
    }
  }
}

const authMiddleware = new AuthMiddleware(myJwt, userService);

module.exports = { authMiddleware };
