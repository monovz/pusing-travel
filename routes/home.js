const HomeController = require('../controllers/HomeController');
const routes = require('express').Router();
const session = require('express-session')

routes.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    }))
    
routes.get('/', HomeController.showHome);

routes.get('/register', HomeController.register)
routes.post('/register', HomeController.registerPost)

routes.get('/login', HomeController.login);
routes.post('/login', HomeController.loginPost);



function checkSession(req,res,next){
    if(req.session.userId){
        next()
    } else {
        res.send('Unauthorized!')
    }
}

routes.use(checkSession)
routes.get('/dashboard',HomeController.dashboard)


routes.get('/logout', HomeController.logout);

module.exports = routes;