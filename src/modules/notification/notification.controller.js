const { CustomError } = require("../../lib/customError");
const { validater } = require("../../lib/validater");
const { notificationSchema } = require("./dto/create-notification.dto");
const { notificationService } = require("./notification.service");
const { userService } = require("../user/user.service");

class NotificationController {
  #notificationService;
  #userService;
  #io;
  constructor(notificationService, userService, io) {
    this.#notificationService = notificationService;
    this.#userService = userService;
    this.#io = io;
  }

  async getAll(req, res, next) {
    try {
      let page = req.query.page;
      let count = req.query.count;

      if (!page) {
        page = 1;
      } else {
        page = Number(page);
      }

      if (!count) {
        count = 3;
      } else {
        count = Number(count);
      }

      const resdata = await this.#notificationService.getAll({ page, count });

      res.status(resdata.status).json(resdata);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const dto = req.body;

      validater(notificationSchema, dto);

      dto.createdAt = new Date();

      if (!dto.isGlobal && !dto.userId) {
        throw new CustomError("Please provide userId or isGlobal true", 400);
      }

      if (dto.userId) {
        await this.#userService.getById(dto.userId);
      }

      const resdata = await this.#notificationService.create(dto);

      this.#io.emit("create:notification", { data: resdata.data });

      res.status(resdata.status).json(resdata);
    } catch (error) {
      next(error);
    }
  }
}

function notificationControllerFn(io) {
  const notificationController = new NotificationController(
    notificationService,
    userService,
    io
  );

  return notificationController;
}

module.exports = { notificationControllerFn };
