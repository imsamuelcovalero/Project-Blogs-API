const { Router } = require('express');
const { postController } = require('../database/controller');
const { auth, validatePost } = require('../middlewares/validators');

const authDecode = require('../middlewares/authDecode');

const route = Router();

route.post('/', auth, authDecode, validatePost, postController.create);

module.exports = route;