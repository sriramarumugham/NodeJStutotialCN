const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

// process  look after the input

queue.process('emails' , function (job , done ){
     console.log("emails worker is processing a job", job.data);
     //caal the mailer to send the comment
     commentsMailer.newComment(job.data);
     done();
});