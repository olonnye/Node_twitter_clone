const models = require("../models");
// renders landing page
exports.get_landing = function(req, res, next) {
  res.render("landing", { title: "Express" });
};

// submit inputted email into DB
exports.submit_lead = function(req, res, next) {
  // test
  console.log("lead email: ", req.body.lead_email);

  return models.Lead.create({
    email: req.body.lead_email
  }).then(lead => {
    res.redirect("/leads");
  });
};

// full list of leads
exports.show_leads = function(req, res, next) {
  return models.Lead.findAll().then(leads => {
    res.render("landing", { title: "Express", leads: leads });
  });
};

// shows individual lead
exports.show_lead = function(req, res, next) {
  return models.Lead.findOne({
    where: {
      id: req.params.lead_id
    }
  }).then(lead => {
    res.render("lead", { lead: lead });
  });
};
