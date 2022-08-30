const { categoriesService } = require('../services');

const categoporiesController = {
  create: async (req, res) => {
    const { name } = req.body;
    console.log('name', name);
    
    const newCategory = await categoriesService.create({ name });

    return res
      .status(201)
      .json(newCategory);
  },

  getAll: async (_req, res) => {
    const categories = await categoriesService.getAll();
    console.log('categories', categories);
    return res.status(200).json(categories);
  },
};

module.exports = categoporiesController;