const bcrypt =require('bcrypt');
const { sign, destroy } = require("jsonwebtoken");
require("dotenv").config();

 const  GeneratePassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

 const ComparePassword = async (password, encryptedPassword) => {    
    return await bcrypt.compare(password, encryptedPassword)
}

 const GenerateToken = async (payload ) => {
    return sign(payload,   process.env.TOKEN_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        })
}

 const ValidatePassword = async (password, encryptedPassword) => {
    return await GeneratePassword(password) === encryptedPassword;
}


module.exports = {ComparePassword,ValidatePassword,GenerateToken,GeneratePassword }
