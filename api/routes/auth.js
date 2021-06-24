const express = require("express");
const router = express.Router();
const { userValidationRules, usersSignupValidator } = require("../validator");

// prettier-ignore
const { signup, signin, signout, requireSignin } = require("../controllers/auth");

// router.post("/signup", usersSignupValidator, signup);
router.post("/signup", userValidationRules(), usersSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
