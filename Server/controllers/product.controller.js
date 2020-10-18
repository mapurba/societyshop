const mongoose = require('mongoose');
const Products = require('../models/Items');


/* Helper Methods */
_getProductsByIds = (ids) => {
    return new Promise((resolve, reject) => {
        return Products.find().where('itemCode').in(ids)
            .exec((err, items) => {
                if (err) reject(err);
                resolve(items);
            });
    });
}

/* APIs */
exports.getAllProducts = (req, res) => {

    // res.status(200).send({})

    Products.find({}).then((result) => {
        res.status(200).send(result);
    });
};

exports.getProductsByIds = (req, res) => {
    const ids = req.body.ids;
    _getProductsByIds(ids).then((items) => {
        res.status(200).send(items);
    }).catch((e) => res.status(404));
}


exports.addProduct = (req, res) => {
    const payload = req.body;
    Products.insertMany(payload).then((result) => {
        res.status(200).send(result);

    }).catch((err) => {
        res.status(489).send(err);
    });
}

exports._getProductsByIds = _getProductsByIds;

