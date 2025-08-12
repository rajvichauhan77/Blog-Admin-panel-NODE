const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const passport = require("passport");


const db = require("./config/db");


require("./config/passport-local-strategy");

const port = 8000;


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));


app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(session({
    name: "RWBN",
    secret: "RWBN",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);



app.use("/", require("./routes/admin"));
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/category", categoryRoutes);
const blogRoutes = require("./routes/blogRoutes");


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("server is connected to port " + port);
});
