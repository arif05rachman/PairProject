const { Admin, User, Courier, UserPackage, Package } = require('../../models')

class AdminController {
    static home(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""
        res.render('./admin/home', { message, isLogin })
    }

    static packageList(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        Package
            .findAll({
                order: [['duration', 'ASC']]
            })
            .then(packages => {
                res.render('./admin/packagelist', { packages, message, isLogin})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static customerList(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        User
            .findAll()
            .then(customers => {
                res.render('./admin/customerlist', { message, isLogin, customers })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static login(req, res){
        Admin
            .findOne({
                where: {
                    name: req.body.name,
                    password: req.body.password
                }
            })
            .then(logged => {
                req.session.login = {
                    name: logged.name,
                    email: logged.email
                }
                res.redirect('/admin/customer/list')
            })
            .catch(err => {
                req.flash('msg', ["Username or Password incorrect"])
                res.redirect('back')
            })
    }

    static logout(req, res){
        req.session.destroy(err => {
            if(err){
                res.send(err)
            } else {
                res.redirect('/admin/customer/list')
            }
        })
    }

    static deletePackage(req, res){
        Package
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((deleted) => {
                req.flash('success', 'Delete Successful')
                res.redirect('back')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editPackage(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        Package
            .findByPk(req.params.id)
            .then(found => {
                res.render('./admin/editpackage', { package:found, message, isLogin })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addPackageForm(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        res.render('./admin/addpackage', { message, isLogin })
    }

    static proceedAddPackage(req, res){
        let newPackage = {
            type: req.body.type,
            price: req.body.price,
            duration: req.body.duration
        }

        Package
            .create(newPackage)
            .then((added) => {
                req.flash('success', `Successfully added ${added.type} package type`)
                res.redirect('/admin/package/list')
            })
            .catch(err => {
                let msg = []
                err.errors.forEach(el => {
                    msg.push(el.message)
                })
                req.flash('msg', msg)
                res.redirect('back')
            })
    }

    static transactionList(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        UserPackage
            .findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })

        // res.render('./admin/transactionlist', { message, isLogin })
    }

    static courierList(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        console.log(message)

        Courier
            .findAll()
            .then(couriers => {
                res.render('./admin/courierlist', { message, isLogin, couriers })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addCourierForm(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        res.render('./admin/addcourier', { message, isLogin})
    }

    static proceedAddCourier(req, res){
        let newCourier = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone_number: req.body.phone_number
        }

        Courier
            .create(newCourier)
            .then(courier => {
                req.flash('msg', `Successfully added courier ${courier.name}`)
                res.redirect('./admin/courier/list')
            })
            .catch(err => {
                
                let generateError = []
                let obj = {}
                err.errors.forEach(el => {
                    obj[el.path] = el.message
                })
                generateError.push(obj)
                
                req.flash('msg', generateError)
                res.redirect('back')
            })
    }
}

module.exports = AdminController