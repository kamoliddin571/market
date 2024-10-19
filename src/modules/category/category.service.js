const { ResData } = require("../../lib/resData");
const { Repository } = require("../../lib/repository");
const { join } = require("node:path");

class CategoryService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getAll() {
    const data = await this.#repository.read();

    return new ResData(200, "success", data);
  }
}

const cartegoriesDir = join(
  __dirname,
  "../../../behi-market-database",
  "categories.json"
);

const repository = new Repository(cartegoriesDir);

const categoryService = new CategoryService(repository);

module.exports = { categoryService };
