const Joi = require('joi');

const validators = {
  validateLogin: async (req, res, next) => {
    console.log('req.body', req.body);
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
    console.log('error', error);

    if (error) {
      const [status, message] = error.message.split('|');
      return res.status(Number(status)).json({ message });
    }

    next(); 
  },

  // validateSales: async (req, res, next) => {
  //   const schema = Joi.array().items(Joi.object({
  //     productId: Joi.number().required().messages({
  //       'any.required': '400|"productId" is required',
  //     }),
  //     quantity: Joi.number().min(1).required().messages({
  //       'any.required': '400|"quantity" is required',
  //       'number.min': '422|"quantity" must be greater than or equal to {#limit}',
  //     }),
  //   }));

  //   const { error } = schema.validate(req.body);

  //   if (error) {
  //     const [status, message] = error.message.split('|');
  //     return res.status(Number(status)).json({ message });
  //   }

  //   next();
  // },
};

module.exports = validators;