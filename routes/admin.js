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

routes.get("/", adminControllers.home)

routes.get("/admin_table", adminControllers.adminTable)

routes.get("/admin_form", adminControllers.adminForm)

routes.post("/insert_admin", avatarImage, adminControllers.insertAdmin)

routes.get("/edit_admin", adminControllers.editAdmin) 


routes.post("/updateAdmin/:id", avatarImage, adminControllers.updateAdmin)

routes.get("/SearchAdminData", adminControllers.SearchAdminData)

module.exports = routes