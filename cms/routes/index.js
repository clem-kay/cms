var express = require('express');
var router = express.Router();

const {Login} = require("../controllers/auth/Login")
const {CreateUser} = require("../controllers/auth/Register")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signIn', Login)
router.post('/register', CreateUser)
module.exports = router;
