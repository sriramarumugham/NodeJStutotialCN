const Post = require("../../../models/post");
const Comment = require("../../../models/post");

module.exports.index = async function (req, res) {
  let post = await Post.find({}).sort("-createdAt").populate("user").populate({
    path: "comments",
    populate: "user",
  });

  return res.json(200, {
    message: "List of posts",
    post: post,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: "Post and associated comments deleted successfully!",
      });
    } else {
      console.log("********", err);
      return res.json(402, {
        message: "you cannot delte the post",
      });
    }
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
