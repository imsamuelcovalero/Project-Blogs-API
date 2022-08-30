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

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const verifyIfEmailExists = await User.findOne({ where: { email } });

    if (verifyIfEmailExists) {
      throw new CustomError(409, 'User already registered');
    }

    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    return token;
  },

  getAll: async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },

  getById: async (id) => {
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

    if (!user) {
      throw new CustomError(404, 'User does not exist');
    }

    return user;
  },

  delete: async ({ userId: id }) => {
    const user = await User.findOne({ where: { id } });

    await user.destroy({ where: { id } });
  },
};

module.exports = userService;