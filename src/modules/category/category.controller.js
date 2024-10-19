const { CustomError } = require("../../lib/customError");
const { validater } = require("../../lib/validater");
const { categoryService } = require("./category.service");
const { userSchema } = require("./dto/create-category.dto");

class CategoryController {
  #categoryService;
  constructor(categoryService) {
    this.#categoryService = categoryService;
  }

  async getAll(req, res, next) {
    try {
      const dto = req.body;

      validater(userSchema, dto);

      const resdata = await this.#categoryService.getAll();

      res.status(resdata.status).json(resdata);
    } catch (error) {
      next(error);
    }
  }
}

const categoryController = new CategoryController(categoryService);

module.exports = { categoryController };
