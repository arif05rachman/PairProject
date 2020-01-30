const express = require('express')
const router = express.Router()

const CustomerController = require('../../controllers/customer/customerController')

router.get('/', CustomerController.index)
router.get('/home', CustomerController.home)

module.exports = router
