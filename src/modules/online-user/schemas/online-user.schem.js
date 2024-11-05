const { Schema, model } = require("mongoose");

const onlineUserSchema = new Schema({
  dbId: { type: Schema.Types.ObjectId, ref: "User" },
  socketId: { type: String },
});
const OnlineUserModel = model("OnlineUser", onlineUserSchema, "onlineUsers");

module.exports = { OnlineUserModel };
