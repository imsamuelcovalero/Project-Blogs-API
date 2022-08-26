const { Router } = require('express');
const { loginController } = require('../database/controller');
const { validateLogin } = require('../middlewares/validators');

const route = Router();

route.post('/', validateLogin, loginController.login);

module.exports = route;