const { Admin, User, Courier, UserPackage, Package } = require('../../models')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);



class CustomerController{
    static index(req, res){
        let session = req.session.login
        let err
        res.render('customer/index',{session, err})
    }
    static home(req, res){
        let session = req.session.login
        if (!session) {
            throw 'You must be login before'
        }
        Package
        .findAll()
        .then(data =>{
            res.render('customer/home', {data, session})
        })
        .catch(err =>{
        res.redirect('/',{session, err})
        })
    }
    static login(req, res){
        let session = req.session.login
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
            res.redirect('home',{user, session})
        })
        .catch(err =>{
            // res.send(err)
            req.flash('msg', ["Username or Password incorrect"])
            res.redirect('back')
        })
    }
    static order(req, res){
        let session = req.session.login
        let idPackage = req.params.id
        Package
        .findAll({                
            where:{
                id:idPackage
                }
        })
        .then(packageData =>{
            // session.packageId={}
            console.log(packageData)
            res.render('customer/order', {packageData, session})
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static orderSend(req, res){
        let session = req.session.login
        let orderForm = req.body
        console.log(session)
        // console.log(orderForm)
        UserPackage
        .create({
            UserId: session.id,
            PackageId: session.packageId,
            status: 'pending',
            date_order: new Date()

        })
        .then(orderSend =>{
            let session = req.session.login
            // console.log(session)
            res.redirect('list')
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static logout (req, res){
        // console.log(req.session)
        // req.session.destroy();

        req.session.destroy(err => {
            if(err){
                res.send(err)
            } else {
                res.redirect('/')
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
            res.render('customer/list',{data, session})
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static register (req, res){
        let session = req.session.login
        let {name, email, password, address, phone_number} = req.body
        let hash = bcrypt.hashSync(password, salt);
        password = hash
        User
        .create({
            name,
            email,
            password,
            address, 
            phone_number, 
            createdAt : new Date(),
            updatedAt : new Date()
        })
        .then(data =>{
            // res.send(data)
            res.redirect('/')
        })
        .catch(err =>{
            res.redirect('/')
        })
    }
}

module.exports = CustomerController