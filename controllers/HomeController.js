const {User} = require('../models')

class HomeController{
    static showHome(req, res){
        res.render('home')
    }

    static register(req, res){
       res.render('register.ejs')
    }

    static registerPost(req,res){
        User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(data =>{
            res.send('success')
        })
        .catch(err => {
            res.send(err)
        })

    }

    static login(req, res){
        res.render('login.ejs')

    }

    static logout(req, res){

    }
}

module.exports = HomeController;