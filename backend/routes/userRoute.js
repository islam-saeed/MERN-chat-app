const express = require('express')
const {updateUser} = require('../controllers/userControllers')
const {storage,getImage,uploadImage} = require('../controllers/imageController')
const router = express.Router()
const multer = require('multer')

// using multer for to process the images
const upload = multer({storage: storage})

// user info update route
router.patch('/image/:id', upload.single('image'),uploadImage)

// user info update route
router.get('/image/:id',getImage)

// user info update route
router.patch('/bio/:id',updateUser)



module.exports = router