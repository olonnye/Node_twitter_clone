exports.show_login = function(req, res, next) {
  res.render("user/login", { formData: {}, errors: {} });
};

exports.show_signup = function(req, res, next) {
  res.render("user/signup", { formData: {}, errors: {} });
};

// authentication
exports.signup = function(req, res, next) {};

exports.login = function(req, res, next) {};
