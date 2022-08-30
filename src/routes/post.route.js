const { Router } = require('express');
const { postController } = require('../database/controller');
const { validatePost, validateUpdatePost } = require('../middlewares/validators');
const { auth, decode } = require('../middlewares/tokenValidator');

const route = Router();

route.get('/search', auth, decode, postController.search);
route.post('/', auth, decode, validatePost, postController.create);
route.get('/', auth, decode, postController.readAll);
route.get('/:id', auth, decode, postController.readOne);
route.put('/:id', auth, decode, validateUpdatePost, postController.update);
route.delete('/:id', auth, decode, postController.delete);

module.exports = route;