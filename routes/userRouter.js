const express  = require("express")
const { signup, signin, verifyUserToken,  uploadImage } = require("../controllers/userController")
const { verify } = require("jsonwebtoken")
const userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.get("/verify", verifyUserToken)
userRouter.post("/upload", uploadImage)

module.exports = userRouter