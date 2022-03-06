const passport = require("passport");
//required strategy
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
//tell passport to use this strategy
passport.use(
    new LocalStrategy(
        {
            //define username field in the schema
            usernameField: "email",
            passReqToCallback: true,
        },
        //call back funciton takese three argument
        function (req, email, password, done) {
            //find the user and establish the identity
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    req.flash("error", err);
                    return done(err);
                }
                if (!user || user.password != password) {
                    req.flash("error", "Invalid Username/Password");
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    )
);
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error finding user--> passport");
            return done(err);
        }
        return done(null, user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is singned in, then pass on the request to next function(controllers action)
    if (req.isAuthenticated()) {
        return next();
    }
    //if the user is not signed in
    return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session
        //cookie and we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
};
module.exports = passport;
