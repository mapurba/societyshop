const Orders = require('../models/Orders');
// const UserMedias = require('../models/UserMedias');
// const async = require('async');

exports.getAllOrders = (req, res) => {
    Orders.find({}).sort('-createdAt').then((result) => {
        res.status(200).send(result);
    }).catch((err) => { res.status(489); });

};

// exports.approveTask = (req, res) => {

//     let BlogPhotosId = [];
//     let newBlogMedias = req.body.usermedia;
//     for (const key in newBlogMedias) {
//         if (newBlogMedias[key].productLink.length <= 0) { newBlogMedias.splice(key, 1); }
//     }
//     async.eachSeries(newBlogMedias, function updateObject(obj, done) {
//         // Model.update(condition, doc, callback)
//         console.log('updating userphoto', obj.id);
//         // if(obj.productLink.length>0){
//         UserMedias.update({ id: obj.id }, { $set: { productLink: obj.productLink, isApproved: true } }, done);
//         // }
//     }, function allDone(err) {
//         // this will be called when all the updates are done or an error occurred during the iteration
//         if (err) {
//             res.sendStatus(489);
//         }
//         res.status(200).send({ msg: 'done' });
//     });


//     // res.send(200);
// };

// exports.getallblog = (req, res) => {

//     BlogPhotos.find({}, (err, result) => {
//         res.status(200).send(result);
//     })
// };