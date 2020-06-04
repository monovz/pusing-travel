const routes = require('express').Router();
const home = require('./home');
const user = require('./user');
const trip = require('./trip');
const admin = require('./admin')

// function changeToAdmin(req, res, next){
//     if(req.session.role === "admin"){
//         res.redirect('/admin')
//     } else{
//         next()
//     }
// }

routes.use('/', home);

routes.use('/admin', admin)

routes.use('/:user', user);


routes.use('/trips', trip);

module.exports = routes;