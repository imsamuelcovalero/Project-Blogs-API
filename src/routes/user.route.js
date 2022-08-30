const { Router } = require('express');
const { userController } = require('../database/controller');
const { validateUser } = require('../middlewares/validators');
const { auth, decode } = require('../middlewares/tokenValidator');

const route = Router();

route.post('/', validateUser, userController.create);
route.get('/', auth, userController.getAll);
route.get('/:id', auth, userController.getById);
route.delete('/me', auth, decode, userController.deleteMe);

module.exports = route;