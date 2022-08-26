// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const CustomError = require('../errors/CustomError');

// const { JWT_SECRET } = process.env;

// if (!JWT_SECRET) {
//   const error = Error;
//   error.message = 'JWT_SECRET não foi definido no .env';
//   throw error;
// }

// const { User } = require('../database/models');

// const auth = async (req, _res, next) => {
//     const { authorization } = req.headers;

//     if (!authorization) {
//       throw new CustomError(401, 'Token not found');
//     }

//     const { email } = jwt.verify(authorization, JWT_SECRET);

//     const user = await User.findOne({ where: { email } });

//     if (!authorization || !email || !user) {
//       throw new CustomError(401, 'Expired or invalid token');
//     }

//     next();
// };

// module.exports = auth;