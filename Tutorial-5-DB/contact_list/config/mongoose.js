// reference of mongoose connection
// https://mongoosejs.com/docs/index.html

// require libraruy
const mongoose=require('mongoose');

// connect to the db with mname contacts_list_DB_1o
mongoose.connect('mongodb://localhost/contacts_list_db_10');

//check the connection
const db=mongoose.connection;

//if error then prints this 
db.on('error' , console.error.bind(console, "Error conneting to db"));

/// if no erro db conneced and open then print
db.once('open' , function(){
    console.log('succesfully connected with the database')
})

