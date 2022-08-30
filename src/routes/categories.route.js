const { Router } = require('express');
const { categoriesController } = require('../database/controller');
const { validateCategory } = require('../middlewares/validators');
const { auth } = require('../middlewares/tokenValidator');

const route = Router();

route.post('/', auth, validateCategory, categoriesController.create);
route.get('/', auth, categoriesController.getAll);

module.exports = route;