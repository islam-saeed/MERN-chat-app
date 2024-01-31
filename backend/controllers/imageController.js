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
    // check the given id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such image'});
    }
    // get the image and check if it exists
    const image = await ImageModel.find({userId:id});
    if(!image || image.length === 0){
        return res.status(404).json({error: 'No such image'});
    }
    console.log(image[0].img.data)
    
    // use a buffer to send the image as a base64 string
    const b64 = Buffer.from(image[0].img.data).toString('base64');
    const mimeType = image[0].img.contentType

    // use the given mimeType for the content type to tell the browser what type of image this is
    res.writeHead(200, {
      'Content-Type': mimeType,
    });

    res.end(b64, 'base64');
}

// create a new image
const uploadImage = async (req, res) => {
    const id = req.params.id;
    // check the given id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'});
    }
    console.log(req.file);
    // get the image and check if it exists
    const currentImage = await ImageModel.find({userId:id});
    if(!currentImage){
        // if it doesn't exist use the uploaded image and create a new one
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
            const user = await User.findByIdAndUpdate(id, {imgURL: `${process.env.CURRENT_URI}/user/image/${id}/`}, {
                new: true,
              })
            res.status(200).json({_id:user._id, name:user.name, email:user.email, imgURL:user.imgURL});
        }
        catch (err){
            res.status(400).json({err: err.message})
        }
    } else{
        // if it does exist find its user and update his imageURL
        const imageBuffer = {
            img: {
                data: fs.readFileSync(path.join(path.dirname(__dirname) + '/uploads/' + req.file.filename)),
                contentType: req.file.mimetype
            },
            userId: id
        }
        await ImageModel.findOneAndUpdate({userId:id}, imageBuffer, {
            new: true,
        });
        try{
            const user = await User.findById(id);
            res.status(200).json({_id:user._id, name:user.name, email:user.email, imgURL:user.imgURL});
        }
        catch (err){
            res.status(400).json({err: err.message})
        }
    }
}

module.exports = {
    storage,
    getImage,
    uploadImage
}