const Joi = require("@hapi/joi");

const contactValidationScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

exports.contactValidateMiddleware = (req, res, next) => {
  const { error } = contactValidationScheme.validate(req.body);
  if (error) {
    res.status(403).send("missing required field");
    return;
  }

  next();
};
