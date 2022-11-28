const Post = require("../models/post");
const { post } = require("../routes");
const Comment=require('../models/comment');

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

module.exports.destroy=function(req, res){
  
  Post.findById(req.params.id , function(err, post){
    if(post){
      if(req.user.id==post.user){
        post.remove();
        Comment.deleteMany(req.params.id , function(err){return res.redirect();})
        
      }
      else{
        return res.redirect('back')
      }
    }
    else{
      return res.redirect('back')
    }
  })
}

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
