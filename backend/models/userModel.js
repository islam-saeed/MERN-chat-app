const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    imgURL: String,
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
},{timestamps: true})

userSchema.statics.signup = async function(email, password, name) {
    // check the fields
    if(!email || !password){
        throw Error('All fields must be filled')
    } else if (!validator.isEmail(email)){
        throw Error('Your e-mail is not valid')
    }

    // see if it exists
    const exists = await this.findOne({email})

    if(exists){
        throw Error('this e-mail already exists')
    }

    // encrypt the password then add it to the db
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash, name})

    return user
}


userSchema.statics.login = async function(email, password) {
    // check the fields
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    // see if it exists
    const user = await this.findOne({email})

    if(!user) {
        throw Error('your e-mail is incorrect')
    }

    // decrypt the password from the db then compare them
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('incorrect password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)