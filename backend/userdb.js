const mongoose = require("mongoose")
const userSchema =mongoose.Schema({
    username:String,
    password:String
})

const users = mongoose.model("users",userSchema)
module.exports={users}