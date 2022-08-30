const { postService } = require('../services');
const CustomError = require('../../errors/CustomError');

const postController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { email } = req.user;
    
    const newPost = await postService.create({ title, content, categoryIds, email });

    return res
      .status(201)
      .json(newPost);
  },

  readAll: async (req, res) => {
    const { id: userId } = req.user;
    const posts = await postService.getAll(userId);
    
    return res.status(200).json(posts);
  },

  readOne: async (req, res) => {
    const { id } = req.params;
    const post = await postService.getById(id);

    if (!post) {
      throw new CustomError(404, 'Post does not exist');
    }

    return res.status(200).json(post);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;
    
    const updatedPost = await postService.update({ id, title, content, userId });

    return res
      .status(200)
      .json(updatedPost);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    
    await postService.delete({ id, userId });

    return res
      .status(204)
      .json();
  },

  search: async (req, res) => {
    const { id: userId } = req.user;
    const { q } = req.query;
    const query = q;
    if (!q) {
      const allPosts = await postService.getAll(userId);
      console.log('allPosts', allPosts);
      return res.status(200).json(allPosts);
    }
    const posts = await postService.search(query, userId);
    console.log('posts', posts);
    if (!posts) {
        throw new CustomError(404, 'No posts found');
    }
    return res.status(200).json(posts);
  },
};

module.exports = postController;