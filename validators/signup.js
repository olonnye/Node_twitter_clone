let validator = require("validator");
let models = require("../models");

//sync function
// writes errors to error object
const validateCreateUserFields = function(errors, req) {
  if (!validator.isEmail(req.body.email)) {
    errors["email"] = "please use a valid email.";
  }
  if (!validator.isAscii(req.body.password)) {
    errors["password"] =
      "Invalid characters in password, please try another password";
  }
  if (!validator.isLength(req.body.password, { min: 8, max: 25 })) {
    errors["password"] =
      "please ensure that your password has a minimum length of 8 characters and maximum of 25 characters";
  }
};

// async function
exports.validateUser = function(errors, req) {
  return new Promise(function(resolve, reject) {
    validateCreateUserFields(errors, req);

    return models.user
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (user !== null) {
          errors["email"] =
            "Email is already in use. Please login or reset your password";
        }
        resolve(errors);
      });
  });
};
