var express = require('express');
var router = express.Router();

const {Login} = require("../controllers/auth/Login")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signIn', Login)
module.exports = router;
