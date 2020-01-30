const { Admin, User, Courier, UserPackage, Package } = require('../../models')
const bcrypt = require('bcrypt');
const transporter = require('../../nodemailer')

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
                console.log(customers)
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

        Package
            .create(newPackage)
            .then((added) => {
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
                    status: [],
                    packageName: [],
                    weight: [],
                    priceTotal: [],
                    dateOrder: [],
                    dateEstComplete: [],
                    datePickup: [],
                    dateFinish: [],
                    dateDeliver: [],
                    dateDelivered: [],
                    courierName: [],
                    courierContact: []
                }
                
                let date = new Date
                transactions.forEach(transaction => {
                    transaction.UserPackages.forEach(el => {
                        list.packageName.push(el.Package.type)
                        list.weight.push(el.weight)
                        list.priceTotal.push(el.weight * el.Package.price)
                        list.dateOrder.push(el.date_order)

                        el.date_estimation = new Date(date.setDate(parseFloat(el.Package.duration)))

                        list.dateEstComplete.push(el.date_estimation)
                        list.datePickup.push(el.date_pickup)
                        list.dateFinish.push(el.date_finish)
                        list.dateDeliver.push(el.date_deliver)
                        list.dateDelivered.push(el.date_delivered)
                        list.courierName.push(el.Courier.name)
                        list.courierContact.push(el.Courier.phone_number)
                        list.status.push(el.status)
                    })
                })
                // console.log(list)
                // res.send(transactions)
                // console.log()

                res.render('./admin/transactionlist', { message, isLogin, transactions, list })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static courierList(req, res){
        let message = req.flash('msg') || ""
        let isLogin = req.session.login || ""
        let success = req.flash('success') || ""

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
                req.flash('msg', `Successfully added courier ${courier.name}`)
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

    static changeStatusTransaction(req, res){
        UserPackage
            .findOne({
                include: [User],
                where: {
                    UserId: req.params.UserId,
                    PackageId: req.params.PackageId
                }
            })
            .then(result => {
                console.log(result)
                let updating = {}
                if(result.status == 'pending'){
                    updating.status = 'on progress'
                    updating.date_pickup = new Date
                } else if(result.status == 'on progress'){
                    updating.status = 'closing process'
                    updating.date_finish = new Date
                } else if(result.status == 'closing process'){
                    updating.date_deliver = new Date
                    updating.status = 'on delivery'
                } else if(result.status == 'on delivery'){
                    updating.date_delivered = new Date
                    updating.status = 'delivered'

                    const mailOptions = {
                        from: 'dipndry2020@gmail.com',
                        to: `${result.User.email}`,
                        subject: 'Laundry Notification',
                        html: `<p> Your laundry have completed and delivered at your provided location! <p>`
                    }

                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log('Mail sent:' + info.response)
                        }
                    })

                } else if(result.status == 'delivered'){
                    updating.status = 'close order'
                }

                return UserPackage.update(updating, {
                    where: {
                        UserId: req.params.UserId,
                        PackageId: req.params.PackageId
                    }
                })
            })
            .then(result => {
                res.redirect('back')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = AdminController