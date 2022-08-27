const { Category } = require('../database/models');

const verify = {
  verifyPostCategory: async (categoryIds) => {
    const allCategories = await Category.findAll();
    const allCategoriesIds = allCategories.map(({ id }) => id);
    const validate = categoryIds.every((categoryId) => allCategoriesIds.includes(categoryId));

    return validate;
  },
};

module.exports = verify;