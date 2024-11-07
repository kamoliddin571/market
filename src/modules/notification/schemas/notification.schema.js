const { Schema, model } = require("mongoose");

const notificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  isGlobal: { type: Boolean, required: true },
});

const NotificationModel = model(
  "Notification",
  notificationSchema,
  "notifications"
);

module.exports = { NotificationModel };
