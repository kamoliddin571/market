const { Router } = require("express");
const categoryRoutes = require("./category/category.routes");

const router = Router();

router.use("/category", categoryRoutes.router);

module.exports = { router };
