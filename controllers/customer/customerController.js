const { Admin, User, Courier, UserPackage, Package } = require('../../models')

class CustomerController{
    static index(req, res){
        res.render('customer/index')
    }
    static home(req, res){
        Package
        .findAll()
        .then(data =>{
            res.render('customer/home', {data})
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = CustomerController