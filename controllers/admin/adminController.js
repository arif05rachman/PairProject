const { Admin, User, Courier, UserPackage, Package } = require('../../models')
const bcrypt = require('bcrypt');

class AdminController {
    static home(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""
        res.render('./admin/home', { message, isLogin })
    }

    static packageList(req, res){
        let message = req.flash('msg') || ""
        let success = req.flash('success') || ""
        let isLogin = req.session.login || ""

        Package
            .findAll({
                order: [['duration', 'ASC']]
            })
            .then(packages => {
                res.render('./admin/packagelist', { packages, message, isLogin, success})
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
                }
            })
            .then(logged => {
                if(bcrypt.compareSync(req.body.password, logged.password)){
                    return logged
                } else {
                    throw 'Username or Password Incorrect'
                }
                
            })
            .then(logged => {
                req.session.login = {
                    name: logged.name,
                    email: logged.email
                }
                res.redirect('/admin/transaction/list')
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

    static proceedEditPackage(req, res){
        let editPackage = {
            type: req.body.type,
            price: req.body.price,
            duration: req.body.duration
        }

        Package
            .update(editPackage, { 
                where: {
                    id: req.params.id
                }
            })
            .then(updated => {
                res.redirect('/admin/package/list')
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

        console.log(newPackage)

        Package
            .create(newPackage)
            .then((added) => {
                // res.send(added)
                req.flash('success', `Successfully added ${added.type} package type`)
                res.redirect('/admin/package/list')
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

    static transactionList(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""

        User
            .findAll({
                include: [
                    {
                        model: UserPackage,
                        include: [{
                            model: Courier,
                        }, {
                            model: Package
                        }]
                    }
                ]
            })
            .then(transactions => {
                let list = {
                    name: [],
                    type: [],
                    totalprice: [],
                    date_order: [],
                    date_estimation: [],
                    date_pickup: [],
                    date_finish: [],
                    date_deliver: [],
                    date_delivered: [],
                    couriername: [],
                    couriercontact: [],
                    status: []
                }
                
                transactions.forEach(transaction => {
                    transaction.UserPackages.forEach(el => {
                        list.name.push(transaction.name)
                        list.type.push(el.Package.type)
                        list.totalprice.push(el.weight * el.Package.price)
                        list.date_order.push(el.date_order)

                        el.date_estimation = el.date_order.setDate(el.date_order.getDate() + parseFloat(el.Package.duration))

                        list.date_estimation.push(el.date_estimation)
                        list.date_pickup.push(el.date_pickup)
                        list.date_finish.push(el.date_finish)
                        list.date_deliver.push(el.date_deliver)
                        list.date_delivered.push(el.date_delivered)
                        list.status.push(el.status)
                        list.couriername.push(el.Courier.name)
                        list.couriercontact.push(el.Courier.phone_number)
                    })
                })

                res.render('./admin/transactionlist', { message, isLogin, list, transactions })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static statusTransaction(req, res){
        console.log(req.params)
        UserPackage
            .findOne({
                where: {
                    UserId: req.params.UserId,
                    PackageId: req.params.PackageId
                }
            })
            .then(found => {
                let update = {
                    status: ""
                }
                if(found.status == 'pending'){
                    update.status = 'on progress'
                    update.date_pickup = new Date
                } else if(found.status == 'on progress'){
                    update.status = 'closing process'
                    update.date_finish = new Date
                } else if(found.status == 'closing process'){
                    update.status = 'on delivery'
                    update.date_deliver = new Date
                } else if(found.status == 'on delivery'){
                    update.status = 'delivered'
                    update.date_delivered = new Date
                } else {
                    update.status = 'completed'
                }

                return UserPackage.update(update, {
                    where: {
                        UserId: req.params.UserId,
                        PackageId: req.params.PackageId
                    }
                })
            })
            .then(data => {
                res.redirect('back')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static courierList(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""
        let success = req.flash('success') || ""

        console.log(success)

        Courier
            .findAll()
            .then(couriers => {
                res.render('./admin/courierlist', { message, isLogin, couriers, success })
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
                req.flash('success', `Successfully added courier ${courier.name}`)
                res.redirect('/admin/courier/list')
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

    static deleteCourier(req, res){
        Courier
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(deleted => {
                req.flash('success', 'Delete Successful')
                res.redirect('back')
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static editCourierForm(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""


        Courier
            .findByPk(req.params.id)
            .then(found => {
                res.render('./admin/editcourier', { message, isLogin, courier:found})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static proceedEditCourier(req, res){
        let editCourier = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone_number: req.body.phone_number
        }

        Courier
            .update(editCourier, {
                where: {
                    id: req.params.id
                }
            })
            .then(courier => {
                req.flash('msg', `Successfully edited courier ${courier.name}`)
                res.redirect('/admin/courier/list')
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