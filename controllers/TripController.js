const {User, Trip, UserTransaction} = require('../models');
const {Op} = require('sequelize')
const helper = require('../helper/helperpricerp')

class TripController{
    static showAll(req, res){
        if(req.query.search){
            Trip.findAll({
                where:{
                        name:{
                            [Op.iLike] : `%${req.query.search}%`
                        }
                    }
            })
                .then(data=> res.render('trips', {data, helper, username: req.session.userId}))
                .catch(err=> res.render('error', {err}))
        } else{
            Trip.findAll()
                .then(data=> res.render('trips', {data, helper, username: req.session.userId}))
                .catch(err=> res.render('error', {err}))
        }
    }

    static tripDetails(req,res){
        let dataTrip = null
        Trip.findOne({where: {id: req.params.id}})
            .then(data => {
                dataTrip = data
                return Trip.findByPk(req.params.id)
            })
            .then(dataTrip => res.render('tripDetails', {dataTrip,helper}))
    }

    static bookTrip(req, res){
        let id = req.params.id;
        if(req.session.userId){
            let dataTrip;
            let dataUser;
            User.findOne({where: {username: req.session.userId}})
                .then(data=>{
                    dataUser  = data;
                    return Trip.findOne({where: {id:id}})
                })

                .then(data2=>{
                    dataTrip = data2
                    const newUserTransaction = {
                        UserId : dataUser.id,
                        ProductId: dataTrip.id,
                    }

                    return UserTransaction.create(newUserTransaction) 
                })
                
                .then(data3=>{
                    res.render('bookNow', { dataUser, dataTrip})
                })

                .catch(err=> res.render('error', {err}))
        } else{
            res.redirect('/login')
        }
    }

    static bookTripPost(req, res){
        let id = req.params.id;
        const newUserTransaction = {
            start_trip: req.body.start_trip,
            end_trip: req.body.end_trip,
            person_quantity: req.body.person_quantity
        }

        User.findOne({
            where:{
                username: req.session.userId
            },
        })
            .then(data=>{
                return UserTransaction.update(newUserTransaction, {
                    where:{
                        UserId: data.id,
                        ProductId: id,
                        status: "waiting"
                    },
                    individualHooks: true
                }) 
            })

            .then(data2=> res.redirect('/trips'))
            .catch(err=> res.render('error', {err}))
    }

    static bookTripDelete(req, res){
        let id = req.params.id;
        UserTransaction.destroy({
            where:{
                [Op.and]: [{
                    ProductId : id
                },{
                    status: "waiting"
                }]
            }
        })

        .then(data=> res.redirect('/trips'))
        .catch(err=> res.render('error', {err}))
    }
}

module.exports = TripController