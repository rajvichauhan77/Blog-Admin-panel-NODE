const express = require("express")
const routes = express.Router()
const path = require("path")
const multer = require("multer")

routes.use(express.urlencoded())

let uploadAvatar = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads/")
    },
    filename:(req, file, cb) => {
        cb(null, Date.now()+"_"+file.originalname)
    }
})

let avatarImage = multer({storage: uploadAvatar}).single("avatar")


const adminControllers = require("../controllers/adminControllers")
const categoryControllers = require("../controllers/categoryControllers")
const router = require("./categoryRoutes")

const passport = require("passport")

routes.get("/", adminControllers.adminLogin)

routes.post("/checkAdminLogin", passport.authenticate('Adminlocal', {failureRedirect: "/"}), adminControllers.checkAdminLogin)

routes.get("/dashboard", adminControllers.home)

routes.get("/admin_table", adminControllers.adminTable)

routes.get("/admin_form", adminControllers.adminForm)

routes.post("/insert_admin", avatarImage, adminControllers.insertAdmin)

routes.get("/edit_admin", adminControllers.editAdmin) 


routes.post("/updateAdmin/:id", avatarImage, adminControllers.updateAdmin)

routes.get("/delete_admin/:id", adminControllers.deleteAdmin)

routes.get("/SearchAdminData", adminControllers.SearchAdminData)

routes.get("/adminProfile",  adminControllers.adminProfile)

routes.get("/adminLogout", async (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.log(err);
            return;
        }
          return res.redirect("/");  
    })
})

routes.get("/category_form", categoryControllers.categoryForm);

module.exports = routes