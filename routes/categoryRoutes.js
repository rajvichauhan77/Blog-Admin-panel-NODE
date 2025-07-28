const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryControllers");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/category_form", categoryControllers.categoryForm);
router.get("/category_table", categoryControllers.categoryTable)
router.post("/insert_category", upload.single("image"), categoryControllers.insertCategory);
router.get("/category_view", categoryControllers.categoryView);

router.get("/edit/:id", categoryControllers.editCategory);   // show edit form
router.post("/update/:id", upload.single("image"), categoryControllers.updateCategory);  // submit form

router.get("/delete/:id", categoryControllers.deleteCategory);


module.exports = router;
