const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    registrationDate : {type:Date, default:Date.now()}
})

userschema.pre("save", function(next){
    if(this.password !== undefined){
     bcryptjs.hash(this.password, 10).then(hash =>{
        this.password = hash
        next()
     }).catch(err =>{
        console.log(err);
     })
    }
})

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userschema)

module.exports = userModel