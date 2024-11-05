const { Router } = require("express");
const categoryRoutes = require("./category/category.routes");
const userRoutes = require("./user/user.routes");
const authRoutes = require("./auth/auth.routes");

const router = Router();

router.use("/category", categoryRoutes.router);
router.use("/user", userRoutes.router);
router.use("/auth", authRoutes.router);

module.exports = { router };
