const express = require("express");

const expressLayouts = require("express-ejs-layouts");

//body parser
const bodyParser = require("body-parser");

//cookie parser
const cookieParser = require("cookie-parser");

//express sessions
const session = require("express-session");

const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

///to make the session storage constant in the server code to prevnet the server code runnig and creting every time when it gets reloaded
const MongoStore = require("connect-mongo");

const SassMiddleware=require('node-sass-middleware');

const flash=require('connect-flash');

const customMiddleWare=require('./config/middleware');

const app = express();

app.use(SassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

const PORT = 8000;

const db = require("./config/mongoose");

//users collection
const User = require("./models/user");

const mongoUrl = "mongodb://localhost/codeial_dev";

//url is encorder
app.use(bodyParser.urlencoded({ extended: false }));

//cooke doing its role
app.use(cookieParser());

//epress session which encripts the  id and decript some id as cookie

app.use(
  session({
    name: "codeial",
    secret: "blahsomething", //a secret ekey code decode
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // https://www.npmjs.com/package/connect-mongo reference
    // https://stackoverflow.com/questions/66388523/error-cannot-init-client-mongo-connect-express-session

    store: MongoStore.create(
      {
        mongoUrl,
      },
      function (err) {
        console.log(err || "connected to teh db");
      }
    ),
  })
);

app.use(passport.initialize());

app.use(passport.session());

//access the user in the locals for the views whenever the new request is made
app.use(passport.setAuthenticatedUser);

//connect flash
app.use(flash());

app.use(customMiddleWare.setFlash);

// static files
app.use(express.static("assets"));

//layouts has to be used before tcalling the routes if failed
// to call the layouts before the routes then it wont work
app.use(expressLayouts);

//for link and scrip to header in the layout
app.set("layout extractStyles", true);
// scripts
app.set("layout extractScripts", true);

app.use("/", require("./routes"));

//view engine
app.set("view engine", "ejs");

app.set("views", "./views");

// create a express router in a seprate moudle

//express layouts

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }
  console.log("Server is runnig on port", PORT);
});
