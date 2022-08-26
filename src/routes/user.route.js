const { Router } = require('express');
const { userController } = require('../database/controller');
const { validateUser } = require('../middlewares/validators');

const route = Router();

route.post('/', validateUser, userController.create);

module.exports = route;