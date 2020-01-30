const { Admin, User, Courier, UserPackage, Package } = require('../../models')
const bcrypt = require('bcrypt')

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
    static login(req, res){
        User
        .findOne({
            where:{
                email : req.body.email
            }
        })
        .then(logged =>{
            if(bcrypt.compareSync(req.body.password, logged.password)) {
                console.log('masuk')
                return logged
            }else{
                throw 'Email or Password Incorrect'
            }
        })
        .then(logged =>{
            req.session.login = {
                id: logged.id,
                name: logged.name,
                email: logged.email,
                phone_number: logged.phone_number,
                address: logged.address
            }
            let user=logged
            res.redirect('home',{user})
        })
        .catch(err =>{
            // res.send(err)
            req.flash('msg', ["Username or Password incorrect"])
            res.redirect('back')
        })
    }
    static order(req, res){
        let idPackage = req.params.id
        Package
        .findAll({                
            where:{
                id:idPackage
                }
        })
        .then(packageData =>{
            let session = req.session.login
            console.log(session)
            res.render('customer/order', {packageData, session})
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static logout (req, res){
        req.session.destroy(err => {
            if(err){
                res.send(err)
            } else {
                res.redirect('/home')
            }
        })
    }
    static list (req, res){
        let session = req.session.login
        UserPackage
        .findAll({
            where:{
                UserId:session.id
            }
        })
        .then(data =>{
            // res.send(data)
            res.render('customer/list',{data})
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = CustomerController