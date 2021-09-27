// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Item = require("../models/Items");
const Products = require("../models/Items");
const http = require("https");
const { curly } = require("node-libcurl");
const User = require("../models/User");

/* Helper Methods */
// @ts-ignore
_getProductsByIds = async (ids) => {
  console.log("getthing the ids");
  // return new Promise((resolve, reject) => {
  const items = await Products.find({ itemCode: ids });
  // console.log(items);
  return items;
  // return items.map((item) => item.itemCode);

  // });
};

exports.getProductFrommerchantById = async (ids, merId) => {
  console.log("getting item from merchant..." + merId);

  const idsMap = new Map();
  ids.forEach((id) => {
    idsMap.set(id, 1);
  });

  const muser = await User.findById({ _id: mongoose.Types.ObjectId(merId.toString()) });

  const items = [];
  muser.inventory.forEach((item) => {
    if (item.itemCode == idsMap.get(item.itemCode)) {
      items.push(JSON.parse(item));
    }
  });

  return items;
};

exports.getProductFrommerchant = async (req, res) => {
  console.log("show items form merchant..." + req);

  let merchant = [];
  req.user.defaultMer.forEach((mer) => {
    merchant.push(mongoose.Types.ObjectId(mer));
  });

  let Q = {
    _id: {
      $in: merchant,
    },
  };

  const user = await User.find(Q);

  const inventory = [];
  user.forEach((user) => {
    if (user.inventory) {
      inventory.push(...user.inventory);
    }
  });

  res.send(inventory).status(200);
};

/* APIs */
// @ts-ignore
exports.getAllProducts = (req, res) => {
  // res.status(200).send({})
  Products.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.getAllProductsV2 = async (req, res) => {
  // res.status(200).send({})

  // Products.find({}).then((result) => {
  //   res.status(200).send(result);
  // });

  const { statusCode, data, headers } = await curly.get(
    "https://www.bigbasket.com/media/uploads/p/m/40018854_4-himalaya-purifying-neem-face-wash.jpg"
  );
  // console.log(statusCode, data.toString("base64"));
  res.send({ img: data }).status(200);
};

exports.getProductsByIds = async (req, res) => {
  const ids = req.body.ids;
  // @ts-ignore
  console.log("getting ids....");
  return await _getProductsByIds(ids);
};

exports.addProduct = async (req, res) => {
  const payload = req.body;
  let newItem = {
    ...payload,
  };
  console.log(req.body);
  let productCount = new Products();
  // @ts-ignore
  productCount.nextCount((err, cnt) => {
    newItem.itemCode = cnt;
    if (newItem.itemCode) {
      console.log("adding new item .. to the inveontory");
      console.log("adding new item .. to the inveontory");
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
    }
  });
};

// @ts-ignore
exports._getProductsByIds = _getProductsByIds;
