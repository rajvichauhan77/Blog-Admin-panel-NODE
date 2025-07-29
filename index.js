const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const passport = require("passport");

// Connect DB
const db = require("./config/db");

// Load Passport strategy
require("./config/passport-local-strategy");

const port = 8000;

// Set view engine
app.set("view engine", "ejs");

// Body parser
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Use session middleware BEFORE passport
app.use(session({
    name: "RWBN",
    secret: "RWBN",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

// ✅ Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// ✅ Then add routes
app.use("/", require("./routes/admin"));
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/category", categoryRoutes);

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("server is connected to port " + port);
});
