const ImageModel = require('../models/ImageModel')
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel')

// setting the storage for multer to save the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});




// get a single image
const getImage = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such image'});
    }
    const image = await ImageModel.find({userId:id});
    if(!image || image.length === 0){
        return res.status(404).json({error: 'No such image'});
    }
    console.log(image[0].img.data)
    const b64 = Buffer.from(image[0].img.data).toString('base64');
    const mimeType = image[0].img.contentType

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': b64.length
    });

    res.end(b64, 'base64');
}

// create a new image
const uploadImage = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'});
    }
    console.log(req.file);
    const imageBuffer = {
        img: {
            data: fs.readFileSync(path.join(path.dirname(__dirname) + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        },
        userId: id
    }
    // add image to db
    try{
        const image = await ImageModel.create(imageBuffer)
        const user = await User.findByIdAndUpdate(id, {imgURL: `http://localhost:4000/user/image/${id}/`})
        res.status(200).json(user);
    }
    catch (err){
        res.status(400).json({err: err.message})
    }
}

module.exports = {
    storage,
    getImage,
    uploadImage
}