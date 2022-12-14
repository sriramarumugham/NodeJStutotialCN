const User = require("../models/user");

const fs=require('fs');
const path=require('path');

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

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id);

      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("***** Multer Error", err);
          return;
        }

        user.name = req.body.name;
        user.email = req.body.email;


        if (req.file) {

          if(user.avatar){
            fs.unlinkSync(path.join(__dirname ,".." ,user.avatar));
          }

          user.avatar = User.avatarPath + "/" + req.file.filename;
          console.log("creted avatar");
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      console.log(err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "you cannot update information");
    return res.status("401").send("Unauthorized");
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
  req.flash("success", "Logged in Successfully");
  return res.redirect(`/users/profile/${req.user.id}`);
};

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log("Couldnt signout user");
      return next(err);
    }

    req.flash("success", " you Logged out ");
    return res.redirect("/");
  });
};
