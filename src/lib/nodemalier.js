const nodemailer = require("nodemailer");
const { config } = require("../config/index");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

module.exports = { transporter };
