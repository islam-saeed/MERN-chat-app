// const http = require("http");
// const { Server } = require("socket.io");
// const express = require("express");
// const app=express();
// const cors=require("cors");

// app.use(cors());

// const httpServer = http.createServer(app);

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"]
//   }
// });
const io = require('socket.io')(3000)

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("new-message", (data) => {
    socket.broadcast.emit("incoming-message", data)
  });
});

// httpServer.listen(3000, ()=>{
//   console.log("Server is running on port 3000");
// })