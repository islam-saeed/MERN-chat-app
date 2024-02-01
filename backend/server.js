require('dotenv').config()
const express = require("express");
const app=express();
const cors=require("cors");
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoute')
const mongoose = require("mongoose");
// middleware

// solving cors errors
app.use(cors());

// turning data into json
app.use(express.json())

// showing information for each request
app.use((req,res,next) => {
    console.log( req.method, req.path )
    next()
})

// authentication routes
app.use('/auth',authRouter)

// user information routes
app.use('/user', userRouter)

// connecting to db and listening for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT,() => console.log('Listening on port ' + process.env.PORT))
    })
    .catch(e => console.log(e.message))