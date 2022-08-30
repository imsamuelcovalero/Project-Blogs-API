require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
const { User } = require('../database/models'); 

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  const error = Error;
  error.message = 'JWT_SECRET não foi definido no .env';
  throw error;
}

const tokenValidator = {
  auth: async (req, _res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError(401, 'Token not found');
    }

    try {
      jwt.verify(authorization, JWT_SECRET);

      next();
    } catch (error) {
      throw new CustomError(401, 'Expired or invalid token');
    }
  },

  decode: async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token não encontrado' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
  
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Erro ao procurar usuário do token.' });
      }
      req.user = user;
  
      next();
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};

module.exports = tokenValidator;