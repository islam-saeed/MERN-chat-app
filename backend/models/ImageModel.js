const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    userId: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Image', ImageSchema);