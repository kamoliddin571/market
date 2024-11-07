const { ResData } = require("../../lib/resData");
const { NotificationModel } = require("./schemas/notification.schema");

class NotificationService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getAll(dto) {
    const data = await this.#repository
      .find()
      .sort({ createdAt: "desc" })
      .skip((dto.page - 1) * dto.count)
      .limit(dto.count);

    return new ResData(200, "success", data);
  }

  async create(dto) {
    const data = await this.#repository.create(dto);

    return new ResData(201, "created", data);
  }
}

const notificationService = new NotificationService(NotificationModel);

module.exports = { notificationService };
