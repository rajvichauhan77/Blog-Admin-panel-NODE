const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.get("/category_form", categoryController.categoryForm);
router.post("/insert_category", categoryController.insertCategory);
router.get("/category_view", categoryController.categoryView);

module.exports = router;
