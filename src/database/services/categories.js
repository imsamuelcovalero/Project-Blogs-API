const CustomError = require('../../errors/CustomError');
const { Category } = require('../models');

const categoriesService = {
  create: async ({ name }) => {
    const verifyIfCategoryExists = await Category.findOne({ where: { name } });

    if (verifyIfCategoryExists) {
      throw new CustomError(409, 'Category already registered');
    }

    const newCategory = await Category.create({ name });

    return newCategory.dataValues;
  },

  getAll: async () => {
    const categories = await Category.findAll();
    return categories;
  },
};

module.exports = categoriesService;