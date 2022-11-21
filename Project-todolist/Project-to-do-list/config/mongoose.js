const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Project_to_do_list');

const db=mongoose.connection;

db.on('error' , function(err){
    if(err){
        console.error.bind(console ,"error in connecting moongose to db");
        return;
    }
})
db.once('open' , function(){
    console.log("successfull connected with the db");
})
