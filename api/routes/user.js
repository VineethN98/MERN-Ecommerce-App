const express = require("express");
const router = express.Router();
const { userValidationRules, usersSignupValidator } = require("../validator");

// prettier-ignore
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

// prettier-ignore
const { userById } = require("../controllers/user");

// 1) User should be signed in
// 2) User should be authenticated, user cannot access other's profile
// 3) User should be Admin
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", userById);

module.exports = router;
