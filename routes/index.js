const routes = require('express').Router();
const home = require('./home');
const user = require('./user');
const trip = require('./trip')

routes.use('/', home);

routes.use('/:user', user);

routes.use('/trips', trip);

module.exports = routes;