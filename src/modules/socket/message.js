const { MessageModel } = require("../message/schemas/message.schema");
const { OnlineUserModel } = require("../online-user/schemas/online-user.schem");

const messageSocketModule = (io, socket, currentUserDbId) => {
  const getMessages = async (userDbId) => {
    if (userDbId) {
      const data = await MessageModel.find({
        $or: [{ from: userDbId }, { to: userDbId }],
      })
        .populate("from")
        .populate("to");

      return data;
    }
  };

  const createMessage = async ({ data }) => {
    if (data.to && data.text) {
      const newMessage = await MessageModel.create({
        from: currentUserDbId,
        to: data.to,
        text: data.text,
      });

      socket.emit("create:message", { data: newMessage });

      const onlineUsers = await OnlineUserModel.find({ dbId: data.to });

      onlineUsers.forEach((onlineUserData) => {
        io.to(onlineUserData.socketId).emit("create:message", {
          data: newMessage,
        });
      });
    }
  };

  getMessages(currentUserDbId).then((messages) => {
    socket.emit("get:mesages", { data: messages });
  });

  socket.on("create:message", createMessage);
};

module.exports = { messageSocketModule };
