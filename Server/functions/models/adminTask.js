const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
// const InstagramPhotos = require('./BlogPhotos');
const User = require('../models/User');

const adminTask = new mongoose.Schema();


/**
 * Helper method for getting user's gravatar.
 */


const AdminTask = mongoose.model('AdminTask', adminTask);
 
module.exports = AdminTask;