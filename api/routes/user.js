const express = require("express");
const router = express.Router();
const { userValidationRules, usersSignupValidator } = require("../validator");

const { signup, signin, signout } = require("../controllers/user");

// router.post("/signup", usersSignupValidator, signup);
router.post("/signup", userValidationRules(), usersSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
