const { Router } = require('express');
const { categoriesController } = require('../database/controller');
const { auth, validateCategory } = require('../middlewares/validators');

const route = Router();

route.post('/', validateCategory, auth, categoriesController.create);

module.exports = route;