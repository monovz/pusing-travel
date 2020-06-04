const HomeController = require('../controllers/HomeController');
const routes = require('express').Router();

routes.get('/', HomeController.showHome);

routes.get('/register', HomeController.register)
routes.post('/register', HomeController.registerPost)

routes.get('/login', HomeController.login);
routes.post('/login', HomeController.loginPost);

routes.get('/logout', HomeController.logout);

module.exports = routes;