const express = require("express");
const cors = require("cors");
const { config, configDto } = require("./config/index");
const { moduleRoutesFn } = require("./modules/module.routes");
const { CustomError } = require("./lib/customError");
const { ResData } = require("./lib/resData");
const { mongodbConnection } = require("./lib/mongoseConnection");
const { validater } = require("./lib/validater");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const socketIo = require("socket.io");
const { createServer } = require("node:http");
const { userSocketModule } = require("./modules/socket/user");
const { getUserId } = require("./modules/socket/getUserId");
const { messageSocketModule } = require("./modules/socket/message");

validater(configDto, config);

const app = express();
const server = createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

const logStream = fs.createWriteStream(
  path.join(__dirname, "../logs", "combine.json"),
  { flags: "a" }
);

app.use((req, res, next) => {
  req.myIo = io;

  const originalSend = res.json;

  res.json = function (body) {
    this.responseBody = body;
    return originalSend.call(this, body);
  };
  next();
});

app.use(
  morgan(
    (tokens, req, res) => {
      const data = {
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        response_time: tokens["response-time"](req, res),
        remote_addr: tokens["remote-addr"](req, res),
        date: tokens.date(req, res, "iso"), // 30-11-2024 12:15:34
        user_agent: tokens["user-agent"](req, res),
        total_time: tokens["total-time"](req, res),
        http_version: tokens["http-version"](req, res),
        reqBody: req.body,
        resBody: res.responseBody,
      };

      return JSON.stringify(data);
    },
    { stream: logStream }
  )
);

const router = moduleRoutesFn(io);

app.use("/api", router);

app.use((req, res, next) => {
  try {
    const url = req.url;
    const method = req.method;
    const status = 404;

    throw new CustomError(status, `url ${url} and method ${method} not found`);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  const resData = new ResData(status, message);

  res.status(resData.status).json(resData);
});

mongodbConnection.connect();

const onConnection = (socket) => {
  const currentUserDbID = getUserId(io, socket);

  userSocketModule(io, socket, currentUserDbID);
  messageSocketModule(io, socket, currentUserDbID);
};

io.on("connection", onConnection);

server.listen(config.SERVER_PORT, () => {
  console.log("http://localhost:" + config.SERVER_PORT);
});
