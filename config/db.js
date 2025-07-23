const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/blog-admin-panel")

const db = mongoose.connection

db.on("connected", (err) => {
    if(err){
        console.log(err)
        return false
    }
    console.log("DB is connected")
})
module.exports = db