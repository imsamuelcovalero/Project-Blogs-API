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

  getAll: async (_req, res) => {
    const categories = await categoriesService.getAll();
    console.log('categories', categories);
    return res.status(200).json(categories);
  },

  // getById: async (req, res) => {
  //   const { id } = req.params;
  //   const user = await userService.getById(id);
  //   return res.status(200).json(user);
  // },
};

module.exports = categoporiesController;