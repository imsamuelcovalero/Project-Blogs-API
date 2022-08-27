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

  getAll: async (_req, res) => {
    const users = await userService.getAll();
    console.log('users', users);
    return res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.status(200).json(user);
  },

  deleteMe: async (req, res) => {
    const { id: userId } = req.user;
    
    await userService.delete({ userId });
    // console.log('deletedPost', deletedPost);

    return res
      .status(204)
      .json();
  },
};

module.exports = userController;