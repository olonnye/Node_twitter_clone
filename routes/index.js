var express = require("express");
var router = express.Router();

let landing = require("../controllers/landing");
let user = require("../controllers/user");
let { isLoggedIn, hasAuth } = require("../middleware/hasAuth");

/* GET home page. */
router.get("/", landing.get_landing);
router.post("/", landing.submit_lead);

/* GET Leads page */
router.get("/leads", isLoggedIn, hasAuth, landing.show_leads);

router.get("/lead/:lead_id", isLoggedIn, hasAuth, landing.show_lead);

router.get("/lead/:lead_id/edit", isLoggedIn, hasAuth, landing.show_edit_lead);
router.post("/lead/:lead_id/edit", isLoggedIn, hasAuth, landing.edit_lead);
router.post("/lead/:lead_id/delete", isLoggedIn, hasAuth, landing.delete_lead);
router.post(
  "/lead/:lead_id/delete-json",
  isLoggedIn,
  hasAuth,
  landing.delete_lead_json
);

/*GET Login Page */
router.get("/login", user.show_login);
router.get("/signup", user.show_signup);
router.post("/login", user.login);
router.post("/signup", user.signup);

/* GET Logout */
router.get("/logout", user.logout);
router.post("/logout", user.logout);

module.exports = router;
