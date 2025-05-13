const express = require("express")
const mongoose = require("mongoose")

const userRoutes = require("./routes/users.js")
const VideoRoutes = require("./routes/videos.js")
const commentRoutes = require("./routes/comments.js")
const authRoutes = require("./routes/auths.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
require('dotenv').config();

const connect = () =>{
    mongoose.connect(process.env.MONGO).then(() =>{
        console.log("Connected to database")
    }).catch((err)=>{
        throw err;
    })
}

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", VideoRoutes)
app.use("/api/comments", commentRoutes)

app.listen(5001, () =>{
    connect()
    console.log("Connected ")
})

// npm and yarn for package management for nodejs.
// nodemon automatically runs the script after every change is made.
// yarn start to automatically run the script
// .env for saving data that we do not want the users to see as the mongo db connection link