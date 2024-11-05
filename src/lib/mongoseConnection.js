const mongoose = require("mongoose");
const { config } = require("../config/index");

class MongodbConnection {
  #dbUrl;
  constructor(dbUrl) {
    this.#dbUrl = dbUrl;
  }

  async connect() {
    try {
      await mongoose.connect(this.#dbUrl);
      console.log("Mongodb connected successfully");
    } catch (error) {
      console.log("Mongodb - ", error.message);
    }
  }
}

const mongodbConnection = new MongodbConnection(config.DB_URL);

module.exports = { mongodbConnection };
