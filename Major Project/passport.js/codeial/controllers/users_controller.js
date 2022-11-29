const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return;
    }
    return res.render("user_profile", {
      title: "user profile",
      profile_user: user,
    });
  });
};

module.exports.update = function (req, res) {

  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      // return res.status('401').send('Unauthorized');
      // return res.redirect(`/users/profile/${req.user.id}`);
    return res.redirect("back");
    });
    // return res.status("401").send("Unauthorized");
  } else {
    
    return res.status("401").send("Unauthorized");
    // return res.redirect("back");
  }
};
module.exports.singUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", { title: "Codeial | sing-up" });
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user.id}`);
  }
  return res.render("user_sign_in", { title: "Codeial | sing-in" });
};

module.exports.create = function (req, res) {
  if (req.password != req.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the User");
      return;
    }
    if (user) {
      return res.redirect("/users/sign-in");
    } else {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.redirect("/users/sign-in");
    }
  });
  // todo
};

module.exports.createSession = function (req, res) {
  // return res.redirect("/users/profile");
  return res.redirect(`/users/profile/${req.user.id}`);
};

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log("Couldnt signout user");
      return next(err);
    }
    console.log("sign-out success");
    return res.redirect("/");
  });
};
