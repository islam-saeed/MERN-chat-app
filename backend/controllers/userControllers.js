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
  // add image to db
  try{
      const user = await User.findByIdAndUpdate(req.params.id, {img: imageBuffer}, {
        new: true,
      });
      user.img=req.file
      console.log(user)
      res.status(200).json(user);
  }
  catch (err){
      res.status(400).json({err: err.message})
  }
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
      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json(error);
    }
}

module.exports = { updateUser, storage, uploadImage }