const express=require('express');

const expressLayouts=require('express-ejs-layouts');

const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser');

const app= express();

const PORT=8000;


const db=require('./config/mongoose');
const User=require('./models/user');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

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