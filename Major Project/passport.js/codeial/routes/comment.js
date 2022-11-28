const express = require("express");
const router = express.Router();

// const postController = require("../controllers/post_controller");
// const passport=require('../config/passport-local-strategy');

const commentController=require('../controllers/comments_controller');

router.post("/create" , commentController.create);

module.exports = router;
