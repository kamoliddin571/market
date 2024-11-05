const { myJwt } = require("../../lib/jwt");

const getUserId = (io, socket) => {
  if (socket.handshake.query?.token) {
    const [type, tokenValue] = socket.handshake.query.token.split(" ");

    if (type !== "Bearer" || !tokenValue) {
      io.to(socket.id).emit("token:error");
    }

    try {
      const { id } = myJwt.verifyAccess(tokenValue);

      return id;
    } catch (error) {
      console.log(" error : ", error.message);
      io.to(socket.id).emit("token:error");
    }
  }
};

module.exports = { getUserId };
