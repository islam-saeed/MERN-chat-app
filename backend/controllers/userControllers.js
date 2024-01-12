const User = require('../models/users')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const fs = require('fs');
const path = require('path');


// setting the storage for multer to save the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// create a new image
const uploadImage = async (req, res) => {
  console.log(req.file);
  const imageBuffer = {
      img: {
          data: fs.readFileSync(path.join(path.dirname(__dirname) + '/uploads/' + req.file.filename)),
          contentType: req.file.mimetype
      }
  }
  console.log(imageBuffer)
  // add image to db
  try{
      const user = await User.findByIdAndUpdate(req.params.id, {img: imageBuffer.img}, {
        new: true,
      });
      res.status(200).json(user.img);
  }
  catch (err){
      res.status(400).json({err: err.message})
  }
}

// get a single image
const getImage = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such image'});
  }
  const image = await ImageModel.findById(id);
  if(!image){
      return res.status(404).json({error: 'No such image'});
  }
  console.log(image.img.data)
  const b64 = Buffer.from(image.img.data).toString('base64');
  const mimeType = image.img.contentType

  res.writeHead(200, {
    'Content-Type': mimeType,
    'Content-Length': b64.length
  });

  res.end(b64, 'base64');
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { password } = req.body;
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      console.log({user, token})
      res.status(200).json({user:{_id:user._id, name:user.name, email:user.email}, token});
    } catch (error) {
      res.status(500).json(error);
    }
}

module.exports = { updateUser, storage, uploadImage }