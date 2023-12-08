mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const User = require("../Models/user");
const fs = require('fs');

const { createError }  = require("http-errors");
const { GeneratePassword, GenerateToken, ComparePassword, ValidatePassword } = require("../helper/jwt");

exports.register = async (req, res) => {
  try {
   console.log(req.body);
   // Get user input
   const { email, password,role } = req.body;
   // Validate user input
   if (!(email && password && role)) {
     res.status(400).json({
      status:400,
      message:"email and password, role is required"});
   }
    else {
      var checkEmail = await User.findOne({ email: email });
     // let checkEmail = false;
      if (checkEmail) {
        res.status(409).json({
          status: 409,
          message: `Email ${email} address already exist`, });
      }
      else {
        //Generating password
        const encrytedPassword = await GeneratePassword(password)
        const user = new User({
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encrytedPassword,
          role:role.toLowerCase(),
          username: req.body.username
        });

        let data = {
          email: email.toLowerCase(),
          password: encrytedPassword,
          role:role.toLowerCase()
        };

        const token = await GenerateToken(data)
        // save user token
        user.token = token;

        if (token) {
          await user.save();
          res.status(201).json({
            data: {...user._doc, password:null},
            status: 201,
            message: "User Registerd Successfully !!",
          });
        } else {
          res.status(404).json({
            status: 404,
            message: `Invalid Credential`,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: `Something wen't wrong`,
    });

  }
};


//Login 
exports.login = async (req, res) => {
  console.log(req.body);

  // Get user input
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    res.status(400).json({
      status:400,
      message:"email and password is required"});
    }
  // Validate if user exist in our database
 const user = await User.findOne({ email });
console.log(user);
  const data = { email: email, password: password, role:user.role  }
  try {
   if (user && (await ComparePassword(password, user.password))) {
   
      // Create token

      const token = await GenerateToken(data)
      if(token){
        // save user token
        user.token = token;
        user.save();
        // user
        res.status(200).json({
          data: {...user._doc, password:null},
          message: 'Login successfully!',
          status: 201
        });
      }
     
    }else{
      res.status(401).json({
        message: "Invalid Credentials",
        status: 401
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      status: 500
    });
  }
}



exports.userList = async (req, res) => {
  try {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10
    }
       
          await User.find().skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)
                .then((results) => {
                  return res.status(200).send({
                    status: 200,
                    data: results,
                  });
              })
              .catch((err) => {
                res.status(500).send({
                  status: 500,
                  message: err,
                });
              });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

