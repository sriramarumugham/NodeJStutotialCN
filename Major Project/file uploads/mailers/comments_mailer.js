const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {

let htmlString=nodeMailer.renderTemplate({
    comment:comment 
},
'/comments/new_comment.ejs'
)

console.log("htmlString" , htmlString);
  nodeMailer.transporter.sendMail(
    {
      from: "sriramlibra0@gmail.com",
      to: comment.user.email,
      subject: "New comment Published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Erro in sending email", err);
        return;
      }
      console.log("Sendt email", info);
      return;
    }
  );
};
