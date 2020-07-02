const Joi = require("@hapi/joi");

const LoginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = LoginValidation;
