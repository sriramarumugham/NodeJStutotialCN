const { populate } = require("../models/comment");
const Post = require("../models/post");
const Users = require("../models/user");

module.exports.home = function (req, res) {
  // console.log("Cookie", req.cookies);

  //   Post.find({}, function (err, posts) {
  //     if (err) {
  //       console.log("Couldnt get the posts", err);
  //       return;
  //     }
  //     return res.render("home", { title: "Codeial /Home", posts: posts });
  //   });

  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: "user",
    })
    .exec(function (err, posts) {
      Users.find({}, function (err, users) {
        if (err) {
          console.log("COuldnt get thelist of users", err);
          return res.redirect("back");
        }
        return res.render("home", {
          title: "Codeial /Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};
