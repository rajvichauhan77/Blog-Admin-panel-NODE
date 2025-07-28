const express = require("express")
const path = require("path")
const db = require("./config/db")

const port = 8000

const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.use("/", express.static(path.join(__dirname, "public")))

app.use("/", require("./routes/admin"))
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/category", categoryRoutes);


// ✅ Correct
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(port, (err) => {
    if(err){
        console.log(err)
        return false
    }
    console.log("server is connected to port " + port)
})