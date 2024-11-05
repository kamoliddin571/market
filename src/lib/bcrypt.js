const bcrypt = require("bcrypt");

class Hashing {
  #saltRounds;
  constructor(saltRounds) {
    this.#saltRounds = saltRounds;
  }
  async hash(password) {
    return await bcrypt.hash(password, this.#saltRounds);
  }

  async isValidate(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

const myHashing = new Hashing(10);

module.exports = { myHashing };
