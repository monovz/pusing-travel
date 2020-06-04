const {User, UserTransaction, Trip} = require('../models')

class UserController{
    static dashboard(req, res){
        let username = req.params.username
        UserTransaction.findAll({
            order:[['createdAt', 'ASC']],
            include: [{
                model: User
            },{
                model: Trip
            }]
        })

            .then(data=> {
                let newData = []
                data.forEach(elem=>{
                    if(elem.User.username === username){
                        newData.push(elem)
                    }
                })
                res.render('userDashboard', {data: newData, username: username})
            })
            .catch(err=> res.render('error', {err}))
    }
}

module.exports = UserController;