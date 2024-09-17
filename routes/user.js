const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  //render signup user
  .get(wrapAsync(userController.renderSignupForm))
  // signup user
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  //render login user
  .get(wrapAsync(userController.renderLoginForm))
  //login user
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );  

//logout user
router.get("/logout", userController.logout);

module.exports = router;
