var express = require('express');
var router = express.Router();
const schemas = require('../helper/schemas'); 
const validation = require('../helper/validation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const {
  register,
 login
} = require("../Controllers//Api/ApiController");

router.post('/register', validation(schemas.user),  register); 

router.post('/login', validation(schemas.user),  login); 

module.exports = router;
