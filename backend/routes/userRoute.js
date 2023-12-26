const express = require('express')
const {updateUser} = require('../controllers/userControllers')
const router = express.Router()

// user info update route
router.patch('/:id',updateUser)


module.exports = router