const express = require('express')
const router = express.Router()

const CustomerController = require('../../controllers/customer/customerController')

router.get('/', CustomerController.index)
router.post('/login', CustomerController.login)
router.get('/home', CustomerController.home)
router.get('/order/:id', CustomerController.order)
router.get('/list', CustomerController.list)

module.exports = router
