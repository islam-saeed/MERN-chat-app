const express = require('express')
const {updateUser} = require('../controllers/userController')
const router = express.Router()

// user info update route
router.patch('/user/:id',updateUser)


module.exports = router