const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
//tell passport to use new google strategy for google login
passport.use(
    new googleStrategy(
        {
            clientID:
                "562587631083-o8td68lsfgbf2gjvbfbkesocne8bg6k5.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8000/users/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ email: profile.emails[0].value }).exec(function (
                err,
                user
            ) {
                if (err) {
                    console.log("error in google strategy passport", err);
                    return;
                }
                // console.log(profile);
                if (user) {
                    return done(null, user);
                } else {
                    User.create(
                        {
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: crypto.randomBytes.toString("hex"),
                        },
                        function (err, user) {
                            if (err) {
                                console.log("error creating user");
                                return;
                            }
                            return done(null, user);
                        }
                    );
                }
            });
        }
    )
);

module.exports = passport;
