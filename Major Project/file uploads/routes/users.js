const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users_controller");

const passport = require("passport");

router.get("/profile/:id", passport.checkAuthentication, usersController.profile);

router.post('/update/:id' , passport.checkAuthentication , usersController.update  );

router.get("/sign-up", usersController.singUp);

router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  usersController.createSession
);


router.get("/destroy-session", usersController.destroySession);

module.exports = router;
