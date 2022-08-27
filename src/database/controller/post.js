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

  readAll: async (_req, res) => {
    const posts = await postService.getAll();
    console.log('posts', posts);
    return res.status(200).json(posts);
  },

  // getById: async (req, res) => {
  //   const { id } = req.params;
  //   const user = await userService.getById(id);
  //   return res.status(200).json(user);
  // },
};

module.exports = postController;