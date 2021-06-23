const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name", "Name is required").notEmpty(),
    body("email", "Enter correct email format").isEmail(),
    body("password", "Password is required").notEmpty(),
    body("password", "Password must be greater in length than 6")
      .isLength({
        min: 6,
      })
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ];
};

usersSignupValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  const firstError = extractedErrors[0];

  return res.status(422).json({
    // errors: extractedErrors,
    errors: firstError,
  });
};

module.exports = {
  userValidationRules,
  usersSignupValidator,
};
