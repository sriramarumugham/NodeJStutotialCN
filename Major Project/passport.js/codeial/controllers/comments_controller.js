const User = require("../models/user");

const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(comment);
      post.save();
      res.redirect("/");
    }
  } catch (err) {
    console.log("couldnt create a post", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Couldnt destroy a comment", err);
    return;
  }
};
