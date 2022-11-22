//fetching the existing instances;
const express=require('express');

const router=express.Router();

const home_controller=require('../controllers/home_controller');

router.get('/' , home_controller.home);

router.use('/users', require('./users'));

console.log("Router loaded");

module.exports=router;