const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const app = express();

app.use(express.static(path.join(__dirname, "public")));




const server = http.createServer(app);
const io = socketio(server);

//run when client connects!!!
io.on("connection", socket => {
    console.log("New WS Connection");
    socket.emit("message", "welcome to chatCod!!!")

    //only when  new user connects not admit
    socket.broadcast.emit("message", "new User Joined!!!");

    //when user disconnects
    socket.on("disconnect", () => {
        io.emit("message", "user disconnected!!!")
    });

    socket.on("chatMessage", msg => {
        socket.emit("message", msg)
    });
})

server.listen(3000);