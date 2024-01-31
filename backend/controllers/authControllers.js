const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// create json web token using the secret to send it with the user
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

// controller that uses the login function from the model and the create token function to authenticate the login
const login = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.login(email,password)

        const token = createToken(user._id)

        res.status(200).json({ user, token})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

// controller that uses the signup function from the model and the create token function to authenticate the signup
const signup = async (req, res) => {
    const { email, password, name } = req.body

    try{
        const user = await User.signup(email, password, name)

        const token = createToken(user._id)

        res.status(200).json({ user, token})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = {login, signup}