const { Router } = require('express');
const { userController } = require('../database/controller');
const { validateUser, auth } = require('../middlewares/validators');

const route = Router();

route.post('/', validateUser, userController.create);
route.get('/', auth, userController.getAll);
route.get('/:id', auth, userController.getById);

module.exports = route;