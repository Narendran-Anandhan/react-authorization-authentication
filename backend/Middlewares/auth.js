const {jwt, verify} = require("jsonwebtoken");

const config = process.env;

exports.verifyToken = (req, res, next) => {
  // const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const token = req.header('authorization')? req.header('authorization').replace('Bearer ', ''):'';
    

  if (!token) {
    res.status(403).json({
      status:403,
      error:"A token is required for authentication "});
           
   
  }
  try {
    const decoded = verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

// export default verifyToken;
