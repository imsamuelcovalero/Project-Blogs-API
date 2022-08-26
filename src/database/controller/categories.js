require('dotenv').config();
const { categoriesService } = require('../services');

const categoporiesController = {
  create: async (req, res) => {
    const { name } = req.body;
    console.log('name', name);
    
    const newCategory = await categoriesService.create({ name });
    // console.log('newCategory', newCategory);

    return res
      .status(201)
      .json(newCategory);
  },

  // getAll: async (_req, res) => {
  //   const users = await userService.getAll();
  //   console.log('users', users);
  //   return res.status(200).json(users);
  // },

  // getById: async (req, res) => {
  //   const { id } = req.params;
  //   const user = await userService.getById(id);
  //   return res.status(200).json(user);
  // },
};

module.exports = categoporiesController;