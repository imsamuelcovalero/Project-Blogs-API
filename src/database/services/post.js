const { Op } = require('sequelize');
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

  getAll: async (userId) => {
    const categories = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          on: { id: userId },
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

  getById: async (id) => {
    const post = await BlogPost.findOne({
      where: { id },
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

    return post;
  },

  update: async ({ id, title, content, userId }) => {
    const post = await BlogPost.findOne({ where: { id } });
    if (!post) {
      throw new CustomError(404, 'Post does not exist');
    }
    if (post.userId !== userId) {
      throw new CustomError(401, 'Unauthorized user');
    }

    await post.update({ title, content, where: { id } });
    const updatedPost = await postService.getById(id);

    return updatedPost;
  },

  delete: async ({ id, userId }) => {
    const post = await BlogPost.findOne({ where: { id } });
    if (!post) {
      throw new CustomError(404, 'Post does not exist');
    }
    if (post.userId !== userId) {
      throw new CustomError(401, 'Unauthorized user');
    }

    await post.destroy({ where: { id } });
  },

  search: async (query, userId) => {
    const posts = await BlogPost.findAll({
      where: { [Op.or]: [{ title: { [Op.like]: `%${query}%` } },
      { content: { [Op.like]: `%${query}%` } }] },
      include: [{
        model: User,
        as: 'user',
        on: { id: userId },
        attributes: { exclude: ['password'] },
      },
      { model: Category,
        as: 'categories',
        through: {
          attributes: [],
        } }],
    });
    return posts;
  },
};

module.exports = postService;