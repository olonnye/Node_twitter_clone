var express = require("express");
var router = express.Router();

let index = require("../controllers/controllersIndex");
/* GET home page. */
router.get("/", index.controllersIndex);

module.exports = router;
