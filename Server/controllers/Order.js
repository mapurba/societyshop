const Orders = require('../models/Orders');
// const UserMedias = require('../models/UserMedias');
// const async = require('async');

exports.getAllOrders = (req, res) => {
    Orders.find({}).sort('-createdAt').then((result) => {
        res.status(200).send(result);
    }).catch((err) => { res.status(489); });

};