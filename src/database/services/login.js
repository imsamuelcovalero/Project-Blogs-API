const jwt = require('jsonwebtoken');
const CustomError = require('../../errors/CustomError');
require('dotenv').config();
const { User } = require('../models');

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  const error = new Error();
  error.message = 'JWT_SECRET não foi definido no .env';
  throw error;
}

const loginService = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new CustomError(400, 'Invalid fields');
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    return token;
  },
};

module.exports = loginService;