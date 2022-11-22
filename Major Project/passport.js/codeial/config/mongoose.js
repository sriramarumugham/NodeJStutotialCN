const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_dev');

const db=mongoose.connection;

db.on('error' , console.error.bind(console, "Error in connecting mongoose to the db"));

db.once('open' , function(){
    console.log("Mongoose connected to the db")
})