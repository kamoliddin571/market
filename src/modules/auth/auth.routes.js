const { Router } = require("express");
const { authController } = require("./auth.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const router = Router();

router.post(
  "/forgot-password",
  authController.forgotPassword.bind(authController)
);
router.post(
  "/verify",
  authMiddleware.checkForgotPasswordToken.bind(authMiddleware),
  authController.verify.bind(authController)
);
router.post(
  "/change-forgot-password",
  authMiddleware.checkForgotPasswordToken.bind(authMiddleware),
  authController.changeNewPassword.bind(authController)
);
router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.post("/refresh-token", authController.refreshToken.bind(authController));
router.post(
  "/change-password",

  authMiddleware.checkToken.bind(authMiddleware),
  authController.changePassword.bind(authController)
);

module.exports = { router };
