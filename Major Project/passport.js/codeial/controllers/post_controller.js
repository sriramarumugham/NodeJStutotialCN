const Post = require("../models/post");
const { post } = require("../routes");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Couldnt create a post", err);
    return res.redirect("/");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (req.user.id == post.user) {
      post.remove();
      await Comment.deleteMany(req.params.id);
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
