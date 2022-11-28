const bodyParser = require('body-parser');
const { application } = require('express');
const express=require('express');
const path=require('path');

const PORT='8000';
//conecting the db;
const db=require('./config/mongoose');
//reuireing the collection from the models

const ToDo=require('./models/ToDo');

const app=express();

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req , res, next){
    console.log(req.url);
    next();
})
app.set('view engine' , "ejs" );

app.set('view ' , path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended:false}));

app.get('/' , function(req, res){
    ToDo.find({} , function(err, todos){
        if(err){
            console.log("error in getting the contacts" , err);
            return;
        }
        return res.render('index', {todos:todos})
    })
})

app.post('/create-todo' , function(req, res){
    ToDo.create({
        description: req.body.description,
        date:req.body.date,
        category:req.body.category
    },
    function(err, newTodo){
        if(err){
            console.log("error in creating a contact",err);
            return;
        }
        console.log("Contact created" , newTodo);
        return res.redirect('back');
    })
})

//how to send the seleted to do in  a array to the server and delete multiple thign on iteration 

app.post('/delete-todo' , function(req, res){
    console.log(req.body);
})
app.listen(PORT , function (err){
    if(err){
        console.log("error in runnig app" , err);
        return ;
    }
    console.log("App is runnig on port",PORT);
    return ;
})
