const express = require('express')
const {updateUser, storage, uploadImage} = require('../controllers/userControllers')
const router = express.Router()
const multer = require('multer')

// using multer for to process the images
const upload = multer({storage: storage})

// user info update route
router.patch('/:id/image', upload.single('image'),uploadImage)

// user info update route
router.patch('/:id/bio',updateUser)



module.exports = router