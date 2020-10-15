const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    id: {
        type: 'String', unique: true, required: true, dropDups: true
    },
    items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscount: {
        type: Number,
        required: false,
        default: 0
    },
    paymentStatus: {
        type: String,
        required: false,
        default:0
        // 0 - payment penmding , -1 - payment failed , 1 - success , 2 - credit 
    },
    orderStatus: {
        type: String,
        required: false,
        default:0
        // order staus o - waitng , 1 - accepted , 2 processing , 3 - delivered
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, { timestamps: true });


/**
 * Helper method for getting user's gravatar.
 */


const Orders = mongoose.model('Orders', orders);

module.exports = Orders;
