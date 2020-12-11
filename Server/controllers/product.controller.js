const mongoose = require("mongoose");
const Item = require("../models/Items");
const Products = require("../models/Items");

/* Helper Methods */
_getProductsByIds = (ids) => {
  return new Promise((resolve, reject) => {
    return Products.find()
      .where("itemCode")
      .in(ids)
      .exec((err, items) => {
        if (err) reject(err);
        resolve(items);
      });
  });
};

/* APIs */
exports.getAllProducts = (req, res) => {
  // res.status(200).send({})

  Products.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.getProductsByIds = (req, res) => {
  const ids = req.body.ids;
  _getProductsByIds(ids)
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((e) => res.status(404));
};

exports.addProduct = async (req, res) => {
  const payload = req.body;
  let newItem = {
    ...payload,
  };
  let productCount = new Products();
  productCount.nextCount((err, cnt) => {
    newItem.itemCode = cnt;
    const product = new Products({ ...newItem });
    product.save(
      (done) => {
        res.status(200).send({ success: true, itemCode: cnt });
      },
      (err) => {
        res.status(489).send(err);
      }
    );
  });

  //     newItem.itemCode = 0;

  //   for (let index = 0; index < payload.length; index++) {
  //     const item = payload[index];

  //
  //       let products = new Products({ ...newItem });
  //       let count = 0;
  //     await products.nextCount((err, cnt) => {
  //       //  products
  //         count = cnt
  //     console.log(count);

  //    });

  //     console.log(count);

  //   }
  //   res.status(489).send({});

  // Products.insertMany(payload).then((result) => {
  //     res.status(200).send(result);

  // }).catch((err) => {
  //     res.status(489).send(err);
  // });
};;

exports._getProductsByIds = _getProductsByIds;
