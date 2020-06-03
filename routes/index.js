const routes = require('express').Router();
const home = require('./home');
// const user = require('./user');
// const userTransaction = require('/userTransaction');
// const trip = require('./trip')

routes.use('/', home);

// routes.use('/:user', user);

// routes.use('/transactions', userTransaction);

// routes.use('/trips', trip);

module.exports = routes;