const express = require("express")
const routes = express.Router()
const path = require("path")

routes.use(express.urlencoded())

const adminControllers = require("../controllers/adminControllers")

routes.get("/", adminControllers.home)

routes.get("/admin_table", adminControllers.adminTable)

module.exports = routes