// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Item = require("../models/Items");
const Products = require("../models/Items");

/* Helper Methods */
// @ts-ignore
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
// @ts-ignore
exports.getAllProducts = (req, res) => {
  // res.status(200).send({})

  Products.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.getProductsByIds = (req, res) => {
  const ids = req.body.ids;
  // @ts-ignore
  _getProductsByIds(ids)
    .then((items) => {
      res.status(200).send(items);
    })
    // @ts-ignore
    .catch((e) => res.status(404));
};

exports.addProduct = async (req, res) => {
  const payload = req.body;
  let newItem = {
    ...payload,
  };
  let productCount = new Products();
  // @ts-ignore
  productCount.nextCount((err, cnt) => {
    newItem.itemCode = cnt;
    const product = new Products({ ...newItem });
    product.save(
      // @ts-ignore
      (done) => {
        res.status(200).send({ success: true, itemCode: cnt });
      },
      (err) => {
        res.status(489).send(err);
      }
    );
  });
};

// @ts-ignore
exports._getProductsByIds = _getProductsByIds;
