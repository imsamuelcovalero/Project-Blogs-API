const { Router } = require('express');
const { categoriesController } = require('../database/controller');
const { auth, validateCategory } = require('../middlewares/validators');

const route = Router();

route.post('/', auth, validateCategory, categoriesController.create);
route.get('/', auth, categoriesController.getAll);

module.exports = route;