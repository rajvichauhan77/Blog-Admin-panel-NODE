const CategoryModel = require("../models/categoryTbl");
const BlogModel = require("../models/blogTbl")

module.exports.addBlog = async (req, res) => {
    try {
        let allCategory = await CategoryModel.find();

        return res.render("addBlog", {
            allCategory,
        })

    } catch (error) {
        console.log("Somthing went wrong");
        return res.redirect("/");
    }
}

module.exports.insertBlog = async (req, res) => {
    try {
        // Debug
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        if (req.file) {
            req.body.blogImage = "/uploads/" + req.file.filename;
        }

        let addBlog = await BlogModel.create(req.body);
        if (addBlog) {
            console.log("Blog inserted successfully");
            return res.redirect("/blog/addBlog");
        } else {
            console.log("Blog not inserted");
            return res.redirect("/blog/addBlog");
        }
    } catch (error) {
        console.log("Error inserting blog:", error);
        return res.redirect("/");
    }
};
