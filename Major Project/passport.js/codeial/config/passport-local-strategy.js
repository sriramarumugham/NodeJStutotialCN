const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new PassportLocal(
    {
      usernameField: "email",
    },

    function (email, password, done) {
      User.findOne({ email }, function (err, user) {
        if (err) {
          console.log("Error in finding the User *** passport");
          return done(err);
        }
        if (user.password != password || !user) {
          console.log("Password wrong or no user");

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
    }
  );
});

///send the user details to the view of ejs

passport.checkAuthentication =function(req, res, next){

   if(req.isAuthenticated()){
    return next();
   }
   return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser =function (req, res , next){

  if(req.isAuthenticated() ){
    res.locals.user=req.user;
  }
   return next();
}

module.exports = passport;
