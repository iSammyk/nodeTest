const userModel = require("../Models/userModels")
const bcryptjs = require("bcryptjs")
const { generateToken, verifyToken } = require("../services/sessionService")
const { cloudinary } = require("../utils/cloudinaryConfig")
const { sendMail } = require("../utils/Mailer")
// const { cloudinary } = require("../utils/cloudinaryConfig")

const signup = async(req, res) => {

try {
    const {username, email, password} = req.body
    if (username === "" || email === "" || password === ""){
        return res.status(409).send({message: "input fields cannot be empty"})
    }
    const existing = await userModel.findOne({email})
    if(existing){
        return res.status(409).send({message: "user already exists"})
    }
    const result = await userModel.create({username, email, password})

     if(!result){
      return  res.status(500).send({message: "error creating user"})
     }
     sendMail(email, username)
      return res.status(201).send({message: "Account created succefully"})
} catch (error) {
    console.log(error);
}
}


const signin = async (req, res) =>{
    try {
        const {email, password} = req.body
        const result = await userModel.findOne({email})
        const compare = await bcryptjs.compare(password, result.password)
        if(!result || !compare){
            return res.status(401).send({message: "invalid credentials"})
        }
        const token = generateToken(result.email)
        return res.status(200).send({message: `welcome ${result.username}`, token})
    } catch (error) {
        
    }
}
const verifyUserToken = (req, res, next) =>{
    try {
        const auth =  req.headers.authorization
        const token = auth.split(" ")[1]
        if(!token){
            return res.status(401).send({message: "unauthorized", status: false})
        }
        const userEmail = verifyToken(token)
        return res.status(200).send({message: "verification successful", userEmail, status: true})
    } catch (error) {
        console.log(error);
        return res.status(401).send({message: error.message})
        next(error)
    }

  
}

const uploadImage = async(req,res) =>{
    console.log("upload")
    const {file} = req.body
    // console.log(file)
    try {
        const result = await cloudinary.uploader.upload(file)
        console.log(result)
        const sec_url = result.secure_url
        console.log(url)
        return res.status(201).send({message: "Image uploaded to cloudinary", sec_url})
    } catch (error) {
        
    }

}

module.exports = {signup, signin, verifyUserToken, uploadImage}