const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findOne({ _id: req.cookies.user_id }, function (err, user) {
      if (err) {
        console.log("cookie incorrect");
      }
      if (user) {
        return res.render("user_profile", {
          title: "user profile",
          user: user,
        });
      } else if (!user) {
        return res.redirect("back");
      }
    });
  }
  else{
    console.log("NO id");
    return res.redirect("/users/sign-in");
  }
 
};
module.exports.singUp = function (req, res) {
  return res.render("user_sign_up", { title: "Codeial | sing-up" });
};
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", { title: "Codeial | sing-in" });
};

module.exports.createSession = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Erro in finding the User");
      return;
    }
    if (!user) {
      return res.redirect("/users/sign-up");
    } else {
      if (user.password != req.body.password) {
        return res.redirect("/users/sign-in");
      }
      res.cookie("user_id", user._id);

      res.redirect("/users/profile");
    }
  });
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

module.exports.signOut=function(req ,res){
     res.cookie("user_id" , null);
    return res.redirect('/users/sign-in');
}

