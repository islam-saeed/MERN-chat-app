// const http = require("http");
// const { Server } = require("socket.io");
require('dotenv').config()
const express = require("express");
const app=express();
const cors=require("cors");
const router = require('./routes/authRoutes')
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json())
app.use((req,res,next) => {
    console.log( req.method, req.path )
    next()
})
app.use('/',router)
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

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT,() => console.log('Listening on port ' + process.env.PORT))
    })
    .catch(e => console.log(e.message))