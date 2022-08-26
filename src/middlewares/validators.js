const Joi = require('joi');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  const error = Error;
  error.message = 'JWT_SECRET não foi definido no .env';
  throw error;
}

const validators = {
  validateLogin: async (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required()
        .messages({
          'string.empty': '400|Some required fields are missing',
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

  auth: async (req, _res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError(401, 'Token not found');
    }
    console.log('authorization', authorization);
    try {
      jwt.verify(authorization, JWT_SECRET);

      next();
    } catch (error) {
      throw new CustomError(401, 'Expired or invalid token');
    }
  }, 
};

module.exports = validators;