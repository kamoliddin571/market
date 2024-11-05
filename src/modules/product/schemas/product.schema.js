const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
});
const ProductModel = model("Product", productSchema, "products");

module.exports = { ProductModel };
