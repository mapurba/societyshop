const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const UserMedias =require('./UserMedias')


const item = new mongoose.Schema({
    // _id: {
    //     type: 'String', unique: true, required: true, dropDups: true
    // },
    name :{
        type:'String', required:true
    },
    price:{
        type:Number,required:true
    },
    image:{
        type:String,
        required:false
    },
    discountPercentage:{
        type:Number,
        default:0
    },
    disc:{
        type:String
    }
       
}, { timestamps: true });


/**
 * Helper method for getting user's gravatar.
 */


const Item = mongoose.model('item', item);

module.exports = Item;
