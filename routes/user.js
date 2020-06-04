const routes = require('express').Router();
const user = require('../controllers/UserController')

routes.get('/dashboard',user.dashboard)

module.exports = routes