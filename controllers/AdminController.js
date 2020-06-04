const {Trip} = require('../models')
class AdminController{
    static dashboard(req, res){
        Trip.findAll({order: [['id', 'asc']]})
        .then(data =>{
            res.render('dashboardadmin',{data})
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }

    static add(req,res){
        res.render('tripadd.ejs')
    }

    static addPost(req,res){
        let newTrip = {
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            description: req.body.description
        }

        Trip.create(newTrip)
        .then(data => {
            res.redirect(`/admin/dashboard`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static edit(req,res){
        let dataTrip = null
        Trip.findAll()
        .then(data => {
            dataTrip = data
            return Trip.findByPk(req.params.id)
        })
        .then(data =>{
        res.render('tripedit.ejs', {data,dataTrip})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editPost(req,res){
        let newTrip = {
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            description: req.body.description
        }

        Trip.update(newTrip,{where: {id: req.params.id}})
        .then(data => {
            res.redirect('/admin/dashboard')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req,res){
        Trip.destroy({where: {id: req.params.id}})
        .then(data => {
            res.redirect('/admin/dashboard')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = AdminController;