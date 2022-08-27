const CustomError = require('../../errors/CustomError');
const { BlogPost, sequelize, PostCategory, User, Category } = require('../models');
const verify = require('../../helper/verify');

const postService = {

  create: async ({ title, content, categoryIds, email }) => {
    const transactionResult = await sequelize.transaction(async (transaction) => {
        const { id } = await User.findOne({ where: { email } });

        const { id: postId, updated, published } = await BlogPost
        .create({ title, content, userId: id },
          { transaction });
        
        const verifyIfCategoryExists = await verify.verifyPostCategory(categoryIds);

        if (verifyIfCategoryExists === false) {
          throw new CustomError(400, '"categoryIds" not found');
        }
        const postCategories = categoryIds.map((element) => ({ postId, categoryId: element }));

        await PostCategory.bulkCreate(postCategories, { transaction });

        const result = { id: postId, title, content, userId: id, updated, published };
        return result;
    });

    return transactionResult;
  },

  getAll: async () => {
    const categories = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: {
            attributes: [],
          },
        },
      ],
    });
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

module.exports = postService;