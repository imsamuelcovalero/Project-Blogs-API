const Joi = require('joi');

const validators = {
  validateLogin: async (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required()
        .messages({
          'string.empty': '400|Some required fields are missing',
          // 'string.email': '400|Invalid fields',
        }),
      password: Joi.string().required()
        .messages({
          'string.empty': '400|Some required fields are missing',
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const [status, message] = error.message.split('|');
      return res.status(Number(status)).json({ message });
    }

    next(); 
  },

  validateUser: async (req, res, next) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required().messages({
        'string.min': '400|"displayName" length must be at least {#limit} characters long',
      }),
      email: Joi.string().email().required().messages({
        'string.email': '400|"email" must be a valid email' }),
      password: Joi.string().min(6).required().messages({
        'string.min': '400|"password" length must be at least {#limit} characters long',
      }),
      image: Joi.string().required().messages({ 'string.empty': '400|Image are missing' }),
    });

    const { error } = schema.validate(req.body);
    console.log('error', error);

    if (error) {
      const [status, message] = error.message.split('|');
      return res.status(Number(status)).json({ message });
    }

    next();
  },
};

module.exports = validators;