const express = require("express");
// multer
const multer  = require('multer')

//ejs
const expressLayouts = require("express-ejs-layouts");

//body parser
const bodyParser = require("body-parser");

//cookie parser
const cookieParser = require("cookie-parser");

//express sessions
const session = require("express-session");
// passort
const passport = require("passport");
//passport local
const passportLocal = require("./config/passport-local-strategy");

//passport jswt

const passportJWT=require('./config/passport-jwt-strategy');

///to make the session storage constant in the server code to prevnet the server code runnig and creting every time when it gets reloaded
const MongoStore = require("connect-mongo");

//sasss the first middle ware
const SassMiddleware=require('node-sass-middleware');

// flash to send the noti after sass
const flash=require('connect-flash');

// to sent the messages to the locals
const customMiddleWare=require('./config/middleware');

// initializing the app
const app = express();

app.use(SassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    //goole the two objects
    outputStyle:'extended',
    prefix:'/css'
}))

const PORT = 8000;

// getting the db from the mongoose
const db = require("./config/mongoose");

//users collection
const User = require("./models/user");

const mongoUrl = "mongodb://localhost/codeial_dev";

//body parsers the first mmiddleware to convert the req.body into accessable objects
app.use(bodyParser.urlencoded({ extended: false }));

//google role of cookie parser
app.use(cookieParser());

//express session which encripts the  id and decript some id as cookie
app.use(
  session({
    name: "codeial",
    secret: "blahsomething", //a secret ekey code decode
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // reference
    // https://www.npmjs.com/package/connect-mongo reference
    // https://stackoverflow.com/questions/66388523/error-cannot-init-client-mongo-connect-express-session

    store: MongoStore.create(
      {
        mongoUrl,
      },
      function (err) {
        console.log(err || "connected to the db");
      }
    ),
  })
);

app.use(passport.initialize());

app.use(passport.session());

// setup the users in the locals
app.use(passport.setAuthenticatedUser);

//connect flash
app.use(flash());

app.use(customMiddleWare.setFlash);

// static files
app.use(express.static("assets"));

//layouts has to be used before tcalling the routes if failed
// to call the layouts before the routes then it wont work
app.use(expressLayouts);

//place css link in header
app.set("layout extractStyles", true);
// place the script link in  body 
app.set("layout extractScripts", true);

//view engine
app.set("view engine", "ejs");

app.set("views", "./views");


// routes handling 
app.use("/", require("./routes"));

app.use('/uploads'  ,express.static(__dirname + '/uploads'));

//view engine
// app.set("view engine", "ejs");

// app.set("views", "./views");

// create a express router in a seprate moudle

//express layouts


//firint the express server on a port
app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }
  console.log("Server is runnig on port", PORT);
});
