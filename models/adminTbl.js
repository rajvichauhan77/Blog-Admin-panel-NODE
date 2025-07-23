const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
        name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    hobbies: {
        type:Array,
        required:true
    },
    avatar: {
        type:String,
        required:true
    },
})

const adminTbl = mongoose.model("admin", adminSchema)
module.exports = adminTbl