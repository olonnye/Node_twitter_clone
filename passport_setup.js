let localStrategy = require("passport-local").Strategy;

let bcryptJS = require("bcryptjs");
let models = require("./models");

const validPassword = function(user, password) {
  return bycryptJS.compareSync(password, user.password);
};

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    models.User.findOne({
      where: {
        id: id
      }
    }).then(user => {
      if (user == null) {
        done(new Error("wrong user id."));
      }
      done(null, user);
    });
  });

  passport.use(
    new localStrategy({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    }),
    function(req, email, password, done) {
      return models.User.findOne({
        where: {
          email: email
        }
      })
        .then(user => {
          if (user == null) {
            // wrong type of username
            req.flash("message", "Incorrect credentials");
            return done(null, false);
          } else if (user.password == null || user.password == undefined) {
            // wrong type of password
            req.flash("message", "you must reset your password");
            return done(null, false);
          } else if (!validPassowrd(user, password)) {
            // wrong user
            req.flash("message", "Incorrect credentials");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(err => {
          done(err, false);
        });
    }
  );
};
