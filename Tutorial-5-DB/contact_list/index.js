//before connectiong with express you need to connect ODM and DB

const express = require("express");
const port = 8000;
const path = require("path");

//setting up the middleware to parser the request body
const bodyParser = require("body-parser");

//before express connection
//connect he mongoose and db
const db = require("./config/mongoose");

//getting the collection from the model
const Contact = require("./models/contact");

//express connection // express as a function
const app = express();

//midleware
app.use(bodyParser.urlencoded({ extended: false }));

// creatign static files middleware
app.use(express.static("asserts"));

//creating a custom middleware;
//middleware1
app.use(function (req, res, next) {
  req.myname = "Sriram";
  next();
});

//middleware2
app.use(function (req, res, next) {
  // console.log("middleware 2", req.myname);
  next();
});

//setting up the apps template engine
app.set("view engine", "ejs");

//__dir name will give curent file path
//path join combies the views folder wiht current path
// setting up the view to the file path of the view folder

app.set("views", path.join(__dirname, "views"));
// app.set('views' , "/dfa/adsfa/adsfsf");

var contactList = [
  { name: "1", phone: "323232323" },

  { name: "2", phone: "22222222222" },

  { name: "3", phone: "1111111111" },

  { name: "5", phone: "33333333333" },

  { name: "6", phone: "44444444" },

  { name: "8", phone: "666666666" },
];

// app.get("/", function (req, res) {
//   res.send("<p>cool its runnig from express </p>");
// });

// app.get('/ejs' , function (req, res){
//     res.render('home')
// })

//middle ware setup

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("err in getting the contacts", err);
      return;
    }
    console.log("got the contacts from db", "contacts");
    return res.render("home", { title: "DB Contacts", contact_list: contacts });
  });
});

app.get("/practice", function (req, res) {
  res.render("practice");
});

// post request

app.post("/create-contact", function (req, res) {
  // pushing the document to the colletion
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("errr in creating a contact", err);
        return;
      }
      console.log("contact Created", newContact);
      return res.redirect("back");
    }
  );
});

//deletecontact
app.get("/delete-contact", function (req, res) {
  let id = req.query.id;
  Contact.findByIdAndDelete(id, function (err){
    if(err){
      console.log("error in deleting" , err);
      return;
    }
      console.log("deleted the contact");
  res.redirect("back");

  }) 
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in runnig the server");
    return;
  }
  console.log("server is up and runnign on port", port);
});
