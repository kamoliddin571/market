const { Schema, model } = require("mongoose");

const korzinkaSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  totalPrice: { type: Number, default: 0, min: 0 },
});

const KorzinkaModel = model("Korzinka", korzinkaSchema, "korzinkas");

module.exports = { KorzinkaModel };
