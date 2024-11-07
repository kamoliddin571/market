const { Router } = require("express");
const { notificationControllerFn } = require("./notification.controller");

function notificationRouterFn(io) {
  const router = Router();

  const notificationController = notificationControllerFn(io);

  router.post("/", notificationController.create.bind(notificationController));
  router.get("/", notificationController.getAll.bind(notificationController));

  return router;
}

module.exports = { notificationRouterFn };
