const Joi = require('joi') 
const schemas = { 
  user: Joi.object().keys({ 
    username: Joi.string().required(),
    email: Joi.string().required(),

  }) 
}; 
module.exports = schemas;