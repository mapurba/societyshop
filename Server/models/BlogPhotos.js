const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const UserMedias =require('./UserMedias')


const blogPhotos = new mongoose.Schema({
    id: {
        type: 'String', unique: true, required: true, dropDups: true
    },
    BlogPhotoId:{type: mongoose.Schema.Types.ObjectId,
        ref: 'UserMedias'},
    productLink:{
        type:Array,
        required:true
    },
    user:{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
       
}, { timestamps: true });


/**
 * Helper method for getting user's gravatar.
 */


const BlogPhotos = mongoose.model('BlogPhotos', blogPhotos);

module.exports = BlogPhotos;
