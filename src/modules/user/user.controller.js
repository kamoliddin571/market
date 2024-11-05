const { validater } = require("../../lib/validater");
const { userCreateDto } = require("./dto/create-user.dto");
const { userService } = require("./user.service");
const { myHashing } = require("../../lib/bcrypt");
const { CustomError } = require("../../lib/customError");

class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async getAll(req, res, next) {
    try {
      const resData = await this.#userService.getAll();

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const dto = req.body;

      validater(userCreateDto, dto);

      const { data: foundUserByLogin } = await this.#userService.getByLogin(
        dto.login
      );

      if (foundUserByLogin) {
        throw new CustomError(400, "User already exists");
      }

      const hashedPassword = await myHashing.hash(dto.password);

      dto.password = hashedPassword;

      const resData = await this.#userService.create(dto);

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController(userService);

module.exports = { userController };
