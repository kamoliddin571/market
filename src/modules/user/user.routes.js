const { Router } = require("express");
const { userController } = require("./user.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { roleMiddleware } = require("../../middlewares/role.middleware");
const { setRoles } = require("../../lib/setRoles");

const router = Router();

router.get(
  "/",
  authMiddleware.checkToken.bind(authMiddleware),
  setRoles("admin", "manager"),
  roleMiddleware.checkRole.bind(roleMiddleware),

  userController.getAll.bind(userController)
);
router.post(
  "/",
  authMiddleware.checkToken.bind(authMiddleware),
  setRoles("admin"),
  roleMiddleware.checkRole.bind(roleMiddleware),
  userController.create.bind(userController)
);

module.exports = { router };
