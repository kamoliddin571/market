const { Router } = require("express");
const categoryRoutes = require("./category/category.routes");
const userRoutes = require("./user/user.routes");
const authRoutes = require("./auth/auth.routes");
const { notificationRouterFn } = require("./notification/notification.routes");

function moduleRoutesFn(io) {
  const router = Router();

  const notificationRouter = notificationRouterFn(io);

  router.use("/category", categoryRoutes.router);
  router.use("/user", userRoutes.router);
  router.use("/auth", authRoutes.router);
  router.use("/notification", notificationRouter);

  return router;
}

module.exports = { moduleRoutesFn };
