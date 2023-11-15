const jsonwebtoken = require("jsonwebtoken")
const secretkey = process.env.JWT_SECRET
require("dotenv").config()

const generateToken = (payload) =>{
    try {
        return jsonwebtoken.sign({ payload }, secretkey, {expiresIn: "4hr"})
    } catch (error) {
        console.log(error);
    }
}

const verifyToken = (token) =>{
    try {
        if(!token){
            throw new Error ({name:"AuthenticationError", messsage:"invalid token"})
        }
        const decodedToken = jsonwebtoken.verify(token, secretkey)
        const email =  decodedToken.payload
        return email
    } catch (error) {
        console.log(error);
        if(error.name === "TokenExpiredError"){
            throw new Error ("session expired, please log in")
        }
        throw new Error ("please log in to continue")
    }
}



module.exports = {generateToken, verifyToken}