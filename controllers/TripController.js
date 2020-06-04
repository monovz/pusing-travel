const {User, Trip, UserTransaction} = require('../models');

class TripController{
    static showAll(req, res){
        Trip.findAll()
            .then(data=> res.render('trips', {data}))
            .catch(err=> res.render('error', {err}))
    }

    static tripDetails(req,res){
        Trip.findOne({where: {id:id}})
            .then(data => res.render('tripDetails', {data}))
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
                    res.render('bookNow', {data : data3})
                })

                .catch(err=> res.render('error', {err}))
        } else{
            res.redirect('/login')
        }
    }

    static bookTripPost(req, res){
        let newUserTransaction = {
            start_date: req.body.start_date
        }
    }
}

module.exports = TripController