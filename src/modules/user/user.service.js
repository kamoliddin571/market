const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");
const { UserModel } = require("./schemas/user.schema");

class UserService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getAll() {
    const users = await this.#repository.find();

    return new ResData(200, "success", users);
  }

  async create(dto) {
    const newData = await this.#repository.create(dto);

    return new ResData(201, "created", newData);
  }

  async getByLogin(login) {
    const data = await this.#repository.findOne({ login });

    const resData = new ResData(200, "success", data);

    if (!data) {
      resData.status = 404;
      resData.message = "User not found";
    }

    return resData;
  }

  async getById(id) {
    const data = await this.#repository.findById(id);

    if (!data) {
      throw new CustomError(404, "User not found");
    }

    return new ResData(200, "success", data);
  }

  async update(id, dto) {
    const data = await this.#repository.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!data) {
      throw new CustomError(404, "User not found");
    }

    return new ResData(200, "success", data);
  }
}

const userService = new UserService(UserModel);

module.exports = { userService };
