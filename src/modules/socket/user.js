const { OnlineUserModel } = require("../online-user/schemas/online-user.schem");

const userSocketModule = (io, socket, currentUserDbId) => {
  const disconnectUser = async () => {
    await OnlineUserModel.findOneAndDelete({
      socketId: socket.id,
    });

    const onlineUsers = await getOnlineUsers();
    io.emit("get:online-users", { data: onlineUsers });
  };

  const getOnlineUsers = async () => {
    const data = await OnlineUserModel.find().populate("dbId");
    return data;
  };

  const addOnlineUser = async (dbId) => {
    await OnlineUserModel.create({ dbId, socketId: socket.id });

    const onlineUsers = await getOnlineUsers();
    io.emit("get:online-users", { data: onlineUsers });
  };

  addOnlineUser(currentUserDbId);
  socket.on("disconnect", disconnectUser);
};

module.exports = { userSocketModule };
