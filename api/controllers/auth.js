// Default imports
const jwt = require("jsonwebtoken"); // To generate signed token
const expressJwt = require("express-jwt"); // for authorization check

// Custom imports
const User = require("../models/user");
const { authenticate, errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

exports.signin = (req, res) => {
  // Find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist. Please signup" });
    }
    // If user exists, authenticate them
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and passwor don't match" });
    }

    // After authentication, generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // Persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource, Access denied",
    });
  }
  next();
};
