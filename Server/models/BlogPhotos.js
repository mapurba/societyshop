const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const UserMedias =require('./UserMedias')


const blogPhotos = new mongoose.Schema();


/**
 * Helper method for getting user's gravatar.
 */


const BlogPhotos = mongoose.model('BlogPhotos', blogPhotos);

module.exports = BlogPhotos;
