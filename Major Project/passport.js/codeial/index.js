const express=require('express');

const expressLayouts=require('express-ejs-layouts');

//body parser
const bodyParser=require('body-parser')

//cookie parser
const cookieParser=require('cookie-parser');


//express sessions
const session=require('express-session');

const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


const app= express();

const PORT=8000;


const db=require('./config/mongoose');

//users collection
const User=require('./models/user');

//url is encorder
app.use(bodyParser.urlencoded({ extended: false }));

//cooke doing its role
app.use(cookieParser());

//epress session which encripts the  id and decript some id as cookie
app.use(session ({
  name:'codeial',
  secret:"blahsomething",//a secret ekey code decode
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100),
  }
}));

app.use(passport.initialize());

app.use(passport.session());

// static files
app.use(express.static("assets"));

//layouts has to be used before tcalling the routes if failed 
// to call the layouts before the routes then it wont work
app.use(expressLayouts);

//for link and scrip to header in the layout
app.set('layout extractStyles', true);
// scripts
app.set("layout extractScripts", true)

app.use('/', require('./routes'))

//view engine
app.set('view engine' , 'ejs');

app.set('views', './views');

// create a express router in a seprate moudle

//express layouts

app.listen(PORT ,function (err){
  if(err){
    console.log(`Error: ${err}`);
     return;
  }
  console.log("Server is runnig on port" , PORT);
})