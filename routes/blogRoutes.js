const express = require("express");
const router = express.Router();
const multer = require("multer");

let uploadblogImage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads/")
    },
    filename:(req, file, cb) => {
        cb(null, Date.now()+"_"+file.originalname)
    }
})

let blogImage = multer({storage: uploadblogImage}).single("blogImage")

const blogControllers = require("../controllers/blogControllers");

const BlogModel = require("../models/blogTbl");

router.get("/addBlog", blogControllers.addBlog);

router.post("/insert_blog", blogImage, blogControllers.insertBlog);


module.exports = router;
