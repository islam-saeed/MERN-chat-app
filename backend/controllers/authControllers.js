const User = require('../models/users')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

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