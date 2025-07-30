const passport = require("passport");

const localStrategy = require("passport-local").Strategy;

const Admin = require("../models/adminTbl");

passport.use('Adminlocal', new localStrategy({
    usernameField : "email"
}, async function(email, password, done) {
    let user = await Admin.findOne({ email: email });

if (!user) {
    return done(null, false); 
}

if (user.password !== password) {
    return done(null, false); 
}

return done(null, user); 

        
}))

passport.serializeUser(function(user, done) {
    if (!user || !user._id) {
        return done(new Error("User object or ID is missing"));
    }
    done(null, user._id);
});


passport.deserializeUser(async function(id, done) {
    try {
        const user = await Admin.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

passport.setAuth = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        
    }
    next();
};



module.exports = passport;