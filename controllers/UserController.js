const {User, UserTransaction, Trip} = require('../models')
const helper = require('../helper/helperpricerp')

class UserController{
    static dashboard(req, res){
        let username = req.session.userId
        UserTransaction.findAll({
            where:{
                status: "booked"
            },
            include: [{
                model: User
            },{
                model: Trip
            }]
        })

            .then(data=> {
                let newData = []
                data.forEach(elem=>{
                    // console.log(elem.User.username)
                    // console.log(username)
                    if(elem.User.username === username){
                        newData.push(elem)
                    }
                })
                
                res.render('userDashboard', {data: newData, username: username, helper})
            })
            .catch(err=> res.render('error', {err}))
    }
}

module.exports = UserController;