require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const errorMiddleware = require('./middlewares/error.middleware');

const loginRoute = require('./routes/login.route');
const userRoute = require('./routes/user.route');
const categoriesRoute = require('./routes/categories.route');

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);

app.use(errorMiddleware);

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
