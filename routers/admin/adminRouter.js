const express = require('express')
const router = express.Router()

const AdminControlller = require('../../controllers/admin/adminController')

router.get('/', AdminControlller.home)
router.post('/login', AdminControlller.login)
router.get('/logout', AdminControlller.logout)

router.use('/', (req, res, next) => {
    if(req.session.login){
        next()
    } else {
        res.redirect('/admin')
    }
})

router.get('/customer/list', AdminControlller.customerList)
router.get('/package/list', AdminControlller.packageList)
router.get('/transaction/list', AdminControlller.transactionList)
router.get('/courier/list', AdminControlller.courierList)

router.get('/package/delete/:id', AdminControlller.deletePackage)
router.get('/package/edit/:id', AdminControlller.editPackage)
router.post('/package/edit/:id', AdminControlller.proceedEditPackage)
router.get('/package/add', AdminControlller.addPackageForm)
router.post('/package/add', AdminControlller.proceedAddPackage)

router.get('/courier/add/', AdminControlller.addCourierForm)
router.post('/courier/add/', AdminControlller.proceedAddCourier)
router.get('/courier/delete/:id', AdminControlller.deleteCourier)
router.get('/courier/edit/:id', AdminControlller.editCourierForm)
router.post('/courier/edit/:id', AdminControlller.proceedEditCourier)

router.get('/status/:UserId/:PackageId', AdminControlller.changeStatusTransaction)

module.exports = router