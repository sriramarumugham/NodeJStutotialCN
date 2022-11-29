const { populate } = require("../models/comment");
const Post = require("../models/post");
const Users = require("../models/user");

try {
  module.exports.home = async function (req, res) {
    let posts = await Post.find({}).populate("user").populate({
      path: "comments",
      populate: "user",
    });
    let users = await Users.find({});

    return res.render("home", {
      title: "Codeial /Home",
      posts: posts,
      all_users: users,
    });
  };
} catch (err) {
  console.log("err", err);
  return;
}
