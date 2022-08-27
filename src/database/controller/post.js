const { postService } = require('../services');

const postController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { email } = req.user;
    
    const newPost = await postService.create({ title, content, categoryIds, email });
    // console.log('newPost', newPost);

    return res
      .status(201)
      .json(newPost);
  },

  // getAll: async (_req, res) => {
  //   const categories = await PostService.getAll();
  //   console.log('categories', categories);
  //   return res.status(200).json(categories);
  // },

  // getById: async (req, res) => {
  //   const { id } = req.params;
  //   const user = await userService.getById(id);
  //   return res.status(200).json(user);
  // },
};

module.exports = postController;