const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
});
const MessageModel = model("Message", messageSchema, "messages");

module.exports = { MessageModel };
