const { ResData } = require("../../lib/resData");
const { NotificationModel } = require("./schemas/notification.schema");

class NotificationService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getAll() {
    const data = await this.#repository.find();

    return new ResData(200, "success", data);
  }

  async create(dto) {
    const data = await this.#repository.create(dto);

    return new ResData(201, "created", data);
  }
}

const notificationService = new NotificationService(NotificationModel);

module.exports = { notificationService };
