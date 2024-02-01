// using dotenv for environment variables
require('dotenv').config()

// creating a user array to hold active users
let users = []

//initializing socket io server
const io = require("socket.io")(3001,{
  
    // handling access control and authorization
    handlePreflightRequest: function (req, res) {
        var headers = {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': process.env.CLIENT_URI,
          'Access-Control-Allow-Methods': 'GET,POST',
          'Access-Control-Allow-Credentials': true
        };
        res.writeHead(200, headers);
        res.end();
      }
  });

// establishing connection and listening for events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // a user sends a new message
  socket.on("new-message", (data) => {
    socket.broadcast.emit("incoming-message", data)
  });
  
  // a user has established connection with the server
  socket.on("new-user", (data) => {
    // send the users list to the new user
    socket.emit("update-users", users)
    console.log(users)

    // add the new user to the server's users list 
    let currentUsers = users.map(user=>user.id)
    if(!currentUsers.includes(data.id)){
      users = [...users,data]
      console.log(users)
      // update the users list for other users
      socket.broadcast.emit("update-users", users)
    }

  });

  // a user has closed the chat
  socket.on('disconnect-event', (data)=>{
    console.log('disconnected')
    // remove the user from the active users list
    users = users.filter(user=>user.id !== data)
    console.log(users)
    // update the active users list for the rest of the active users
    socket.broadcast.emit("update-users", users)
  })

});