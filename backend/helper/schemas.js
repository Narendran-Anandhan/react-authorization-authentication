const Joi = require('joi') 
const schemas = { 
  user: Joi.object().keys({ 
    username: Joi.string().required(),
    email: Joi.string().required(),

  }),
  organization: Joi.object().keys({ 
    name: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),

  }) 
}; 
module.exports = schemas;