const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new PassportLocal(
    {
      usernameField: "email",
      passReqToCallback: true,
    },

    function (req, email, password, done) {
      User.findOne({ email }, function (err, user) {
        if (err) {
          // console.log("Error in finding the User *** passport");
          req.flash("error", "not a valid user name / password");
          return done(err);
        }
        if (user.password != password || !user) {
          // console.log("Password wrong or no user");

          req.flash("error", "not a valid user name / password");

          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Someone fiddled aroudn with cookies ***** pasport");
      return done(err);
    }
    console.log("deserialize success ***** pasport");
    return done(null, user);
  });
});

//checking the user before showing the views page
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please sing in ");
  return res.redirect("/users/sign-in");
};
 
//setting users in locals caling in  as  middle ware in the index.js 
passport.setAuthenticatedUser = function (req, res, next) {

  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
