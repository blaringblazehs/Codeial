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
        },
        //call back funciton takese three argument
        function (email, password, done) {
            //find the user and establish the identity
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    console.log("error finding user--> passport");
                    return done(err);
                }
                if (!user || user.password != password) {
                    console.log("Invalid Username/Password");
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

module.exports = passport;
