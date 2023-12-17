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

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT,() => console.log('Listening on port ' + process.env.PORT))
    })
    .catch(e => console.log(e.message))