class ResData {
  constructor(status, message, data = null) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

module.exports = { ResData };
