const form = document.getElementById("sms-form");
const inputTo = document.getElementById("to");
const inputText = document.getElementById("text");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjM5ZmZhYjFlZTZhOGI2NjFlYmQ0ZiIsImV4cCI6MTczMDgyNDg2MSwiaWF0IjoxNzMwODIxMjYxfQ.fWJpXiAyyu2IrdMvhnXv1LsbY5BxxEXesp2YP20MyK4";

const socket = io("http://localhost:7777", {
  query: {
    token: token,
  },
});

socket.on("token:error", () => {
  alert("Token is invalid");
});

socket.on("get:online-users", ({ data }) => {
  console.log(data);
});

socket.on("get:mesages", ({ data }) => {
  console.log(data);
});

socket.on("create:message", ({ data }) => {
  console.log(data);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputTo.value.length && inputText.value.length) {
    socket.emit("create:message", {
      data: {
        to: inputTo.value,
        text: inputText.value,
      },
    });
  }

  inputTo.value = "";
  inputText.value = "";
});

socket.on("create:notification", ({ data }) => {
  console.log(data);
});

socket.on("login", ({ data }) => {
  console.log(data);
});
