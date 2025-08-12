const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
     categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryTbl",
        required:true
    },
    title: {
        type:String,
        required:true
    },
    blogDetails: {
        type:String,
        required:true
    },
   
   blogImage: {
        type:String,
        required:true
    },
    
   
})

const blogTbl = mongoose.model("blog", blogSchema)
module.exports = blogTbl