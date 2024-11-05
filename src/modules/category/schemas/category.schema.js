const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: { type: String, required: true, min: 3 },
});
const CategoryModel = model("Category", categorySchema, "categories");

module.exports = { CategoryModel };
