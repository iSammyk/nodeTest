const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const userRouter = require("./routes/userRouter")
const cors = require("cors")
port = 5003

app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({extended: true, limit: "100mb"}))

app.use(cors({origin: "*"}))

app.use("/users", userRouter)

const connect = () =>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connected to database succesfully");
    }).catch((err) =>{
        console.log(err);
    })
}

connect()

app.listen(port, () =>{
    console.log(`app is listening on port ${port}`);
})