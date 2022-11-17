const express = require("express");

const path = require("path");

const port = 8000;

// express as a function
const app = express();

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

var contactList=[

  {name:"Arpan",
   phone:"323232323",
  },
  
  {name:"Arpan",
   phone:"323232323",
  },
  
  {name:"Arpan",
   phone:"323232323",
  },
  
  {name:"Arpan",
   phone:"323232323",
  },
  
  {name:"Arpan",
   phone:"323232323",
  },
  
  {name:"Arpan",
   phone:"323232323",
  },
  ]
  
// app.get("/", function (req, res) {
//   res.send("<p>cool its runnig from express </p>");
// });

// app.get('/ejs' , function (req, res){
//     res.render('home')
// })

app.get("/", function (req, res) {
  res.render("home", { title: "title from express"  , contact_list: contactList});
});

app.get('/practice' , function(req , res){
  res.render('practice');
})

// post request 

app.post('/create-contact' , function (req , res){
  return res.redirect('/practice');
})

app.listen(port, function (err) {
  if (err) {
    console.log("Error in runnig the server");
    return;
  }
  console.log("server is up and runnign on port", port);
});
