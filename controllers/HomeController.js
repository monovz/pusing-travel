const {User} = require('../models')
const bcrypt = require('bcrypt')

class HomeController{
    static showHome(req, res){
        res.render('home')
    }

    static register(req, res){
       res.render('register.ejs')
    }

    static registerPost(req,res){
        let newUser = {
                username: req.body.username,
                password: req.body.password,
            }
        User.create(newUser)
        .then(data =>{
            res.redirect('/login')
        })
        .catch(err => {
            res.send(err)
        })

    }

    static login(req, res){
        res.render('login.ejs')

    }

    static loginPost(req,res){
        User.findOne({where: { username: req.body.username}})
        .then((data) => {
            if (!data) res.send('Username not found!')
            else{
                if(bcrypt.compareSync(req.body.password, data.password)){
                    req.session.userId = req.body.username
                    res.redirect(`/${req.body.username}/dashboard`)
                } else{
                    res.send(`username dan password tidak cocok`)
                }
            }
        })
    }

    static logout(req, res){
        req.session.destroy((err)=>{
            if(err) res.render('error', {err})
            else{
                res.redirect('/')
            }
        })
    }
}

module.exports = HomeController;