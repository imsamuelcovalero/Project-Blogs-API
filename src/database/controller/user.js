require('dotenv').config();
const { userService } = require('../services');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    console.log('email', email);
    
    const token = await userService.create({ displayName, email, password, image });
    console.log('token', token);

    return res
      .status(201)
      .json({ token });
  },
};

module.exports = userController;