const routes = require('express').Router();
const user = require('../controllers/UserController')

function checkSession(req,res,next){
    if(req.session.userId){
        next()
    } else {
        res.send('Unauthorized!')
    }
}

// routes.use('/transactions', userTransaction);

routes.use(checkSession)
routes.get('/dashboard', user.dashboard)

module.exports = routes