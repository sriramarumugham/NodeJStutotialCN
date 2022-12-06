const Post = require("../models/post");
const { post } = require("../routes");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created",
      });
    }
    req.flash("success", "post created");

    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Cannot be posted");
    return res.redirect("/");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (req.user.id == post.user) {
      post.remove();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "post deleted");

      await Comment.deleteMany(req.params.id);

      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delte the post");

      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);

    return res.redirect("back");
  }
};
