const fs = require("node:fs/promises");

class Repository {
  #dir;
  constructor(dir) {
    this.#dir = dir;
  }

  async read() {
    let jsonData = await fs.readFile(this.#dir, "utf-8");

    if (jsonData) {
      jsonData = JSON.parse(jsonData);
    } else {
      jsonData = [];
    }

    return jsonData;
  }

  async write(data) {
    fs.writeFile(this.#dir, JSON.stringify(data, null, 2));
  }
}

module.exports = { Repository };
