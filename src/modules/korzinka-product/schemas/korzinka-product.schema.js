const { Schema, model } = require("mongoose");

const korzinkaProductSchema = new Schema({
  korzinkaId: { type: Schema.Types.ObjectId, ref: "Korzinka" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  count: { type: Number, default: 1, min: 1, required: true },
  totalPrice: { type: Number, default: 0, min: 0, required: true },
});

const KorzinkaProductModel = model(
  "KorzinkaProduct",
  korzinkaProductSchema,
  "korzinkaProducts"
);

module.exports = { KorzinkaProductModel };
