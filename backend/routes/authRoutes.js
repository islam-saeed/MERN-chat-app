const express = require('express')
const { login, signup } = require('../controllers/authControllers')
const router = express.Router()

// login route
router.post('/user/login',login)

// signup route
router.post('/user/signup',signup)


module.exports = router