const { ResData } = require("../../lib/resData");
const { Repository } = require("../../lib/repository");
const { join } = require("node:path");
const { CategoryModel } = require("./schemas/category.schema");

class CategoryService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getAll() {
    const data = await this.#repository.find();

    return new ResData(200, "success", data);
  }
}

const cartegoriesDir = join(
  __dirname,
  "../../../behi-market-database",
  "categories.json"
);

// const repository = new Repository(cartegoriesDir);

const categoryService = new CategoryService(CategoryModel);

module.exports = { categoryService };
