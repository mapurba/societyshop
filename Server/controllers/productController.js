const mongoose = require('mongoose');
const Products = require('../models/Items');

exports.getAllProducts= (req,res)=>{

    // res.status(200).send({})

    Products.find({}).then((result)=>{
        res.status(200).send(result);
    });

};


exports.addProduct = (req,res) => {
    
    payload = req.body;

    Products.insertMany(payload).then((result) =>{
        res.status(200).send(result);

    }).catch((err)=>{
        res.status(489).send(err);
    });
}