var express = require('express');
var router = express.Router();
const schemas = require('../helper/schemas'); 
const validation = require('../helper/validation');
const {verifyToken} = require("../Middlewares/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const {register,login} = require("../Controllers/Api/ApiController");

const {createUser,getUser,updateUser,deleteUser} = require("../Controller/userController");

const {createOrganization,getOrganization,updateOrganization,deleteOrganization} = require("../Controller/userOrganization");

//Authentication
router.post('/register', validation(schemas.user),  register); 

router.post('/login', validation(schemas.user),  login); 

//user
router.post('/user', validation(schemas.user), verifyToken, createUser); 

router.get("/user",verifyToken, getUser);

router.put("/user/:userId",verifyToken, updateUser);

router.delete("/user/:userId",verifyToken, deleteUser);

//organization
router.post('/organization', validation(schemas.organization),verifyToken,  createOrganization); 

router.get("/organization",verifyToken, getOrganization);

router.put("/organization/:orgId",verifyToken, updateOrganization);

router.delete("/organization/:orgId",verifyToken, deleteOrganization);

module.exports = router;
