const Post = require("../models/post");
const { post } = require("../routes");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err) {
      if (err) {
        console.log("Couldnt create a post", err);
        return;
      }
      return res.redirect("/");
    }
  );
};

// module.exports.get=function(req, res){
  
//    Post.find({} , function(err, posts){
//     if(err){
//       console.log("Couldnt get the posts");
//       return ;
//     }
//     console.log("posts got from the db" , post);
//     return;
//     // return res.render('home' , {posts:posts});
//    })
// }
