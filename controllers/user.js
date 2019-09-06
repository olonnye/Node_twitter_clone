let models = require("../models");
let bcryptJS = require("bcryptjs");
const passport = require("passport");
const myPassport = require("../passport_setup")(passport);
let flash = require("connect-flash");
const { isEmpty } = require("lodash");
const { validateUser } = require("../validators/signup");

exports.show_login = function(req, res, next) {
  res.render("user/login", { formData: {}, errors: {} });
};

exports.show_signup = function(req, res, next) {
  res.render("user/signup", { formData: {}, errors: {} });
};

// if errors on page function helps rerender page with same input fields
const rerender_signup = function(errors, req, res, next) {
  res.render("user/signup", { formData: req.body, errors: errors });
};
// authentication
const generateHash = function(password) {
  return bcryptJS.hashSync(password, bcryptJS.genSaltSync(8), null);
};

exports.signup = function(req, res, next) {
  let errors = {};
  return validateUser(errors, req).then(errors => {
    if (!isEmpty(errors)) {
      // if errors rerenders signup page with erros
      rerender_signup(errors, req, res, next);
    } else {
      return models.user
        .findOne({
          // checks for admin key in current users
          where: {
            is_Admin: true
          }
        })
        .then(user => {
          let newUser;
          if (user !== null) {
            // checks for user in system if none then adds to database
            newUser = models.user.build({
              email: req.body.email,
              password: generateHash(req.body.password)
            });
          } else {
            // if no current admin then makes new user with admin key and value true
            newUser = models.user.build({
              email: req.body.email,
              password: generateHash(req.body.password),
              is_Admin: true
            });
          }
          return newUser.save().then(result => {
            // saves user and returns to home page
            passport.authenticate("local", {
              successRedirect: "/",
              failureRedirect: "/signup",
              failureFlash: true
            })(req, res, next);
          });
        });
    }
  });
};

exports.login = function(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
};

exports.logout = function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
