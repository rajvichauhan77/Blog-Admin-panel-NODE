const categoryTbl = require("../models/categoryTbl");

const categoryForm = async (req, res) => {
    res.render("category_form");
};

const insertCategory = async (req, res) => {
    try {
        await categoryTbl.create(req.body);
        res.redirect("/category_view");
    } catch (error) {
        console.log(error);
        res.send("Error inserting category");
    }
};

const categoryView = async (req, res) => {
    try {
        let categories = await categoryTbl.find();
        res.render("category_view", { categories });
    } catch (error) {
        console.log(error);
        res.send("Error displaying categories");
    }
};

module.exports = { categoryForm, insertCategory, categoryView };
