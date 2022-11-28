const Post = require('../models/post');

module.exports.home = function (req, res) {
  
    // console.log("Cookie", req.cookies);

//   Post.find({}, function (err, posts) {
//     if (err) {
//       console.log("Couldnt get the posts", err);
//       return;
//     }
//     return res.render("home", { title: "Codeial /Home", posts: posts });
//   });

  Post.find({}).populate('user').exec(function(err, posts){

    if (err) {
        console.log("Couldnt get the posts", err);
        return;
      }
      return res.render("home", { title: "Codeial /Home", posts: posts });
    
  })
};
