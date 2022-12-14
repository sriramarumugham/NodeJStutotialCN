const express = require("express");

const port = 8000;

const path = require("path");

//setting up the middleware to parser the request body
const bodyParser = require("body-parser");

// express as a function
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

//listen  functon from express

//Cannot GET/

//request response cycle
//types of request

//creating a temproary contact list to send to the view page

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
  //modidief myname added to reqeust from middleware
  // console.log(req.myname, "from controller");
  res.render("home", {
    title: "title from express",
    contact_list: contactList,
  });
});

app.get("/practice", function (req, res) {
  res.render("practice");
});

// post request

app.post("/create-contact", function (req, res) {
  //add the request body to the test contact list and sending to the view js
  // console.log(req.body);
  contactList.push(req.body);

  return res.redirect("/");
});

//deletecontact

app.get("/delete-contact", function (req, res) {

// app.get("/delete-contact/:phone", function (req, res) {
 
    let phone =  req.query.phone;
    console.log(phone , typeof(phone))
  // let phone = req.params.phone;

  const index=contactList.findIndex(contact=>contact.phone==phone.toString());

  // contactList.map(contact=>{
  //   console.log(contact.phone , phone , typeof(contact.phone) , typeof(phone));
  // })
  console.log(index);

  if (index != -1) {
    contactList.splice(index, 1);
  }

  res.redirect("back");
});


app.listen(port, function (err) {
  if (err) {
    console.log("Error in runnig the server");
    return;
  }
  console.log("server is up and runnign on port", port);
});
