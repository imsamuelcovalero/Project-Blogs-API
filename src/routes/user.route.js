const { Router } = require('express');
const { userController } = require('../database/controller');
const { validateUser, auth } = require('../middlewares/validators');
const authDecode = require('../middlewares/authDecode');

const route = Router();

route.post('/', validateUser, userController.create);
route.get('/', auth, userController.getAll);
route.get('/:id', auth, userController.getById);
route.delete('/me', auth, authDecode, userController.deleteMe);

module.exports = route;