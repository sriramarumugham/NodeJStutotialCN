const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use a new strategy to login the user ;

passport.use(
  new googleStrategy(
    {
      clientID:
        "751383953920-f8mc8m5notb4msc89bc9b5ksvgkcfej9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Erro in passport google oauth strategy ", err);
          return;
        }
        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "Erro in crating a user passport Google oauth strtegy",
                  err
                );
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
