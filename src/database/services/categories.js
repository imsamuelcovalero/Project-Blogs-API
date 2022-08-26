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

  // getById: async (id) => {
  //   const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  //   if (!user) {
  //     throw new CustomError(404, 'User does not exist');
  //   }

  //   return user;
  // },
};

module.exports = categoriesService;