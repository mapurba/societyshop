const Orders = require("../models/Orders");
const Products = require("../models/Items");
const productController = require("./product.controller");
const mongoose = require("mongoose");
const signatureVerification = require("../util/signatureCreation");
const config = require("../util/config.json");
const enums = require("../util/enums");

/* Helper Methods */
calculateBill = (items, quantityMap) => {
  console.log("calculating bill....");
  let bill = {};
  try {
    const totalAmount = items.reduce((acc, item2) => {
      return acc + item2.price.new * 1;
    }, 0);

    const totalAmountAfterDiscount = items.reduce(
      (acc, item2) =>
        acc +
        item2.price.new *
          quantityMap[item2.itemCode] *
          (1 - item2.discountPercentage / 100),
      0
    );

    bill = {
      totalAmount: totalAmount,
      totalAmountAfterDiscount: totalAmountAfterDiscount || 0,
      totalDiscount: totalAmount - totalAmountAfterDiscount || 0,
    };
    console.log({ bill });

    return bill;
  } catch (e) {
    console.log(e);
  }
  return bill;
};

exports.getAllOrders = async (req, res) => {
  const ruser = await req.user;

  // if (ruser["isMer"] == true) {
  Orders.find({})
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(489);
    });
  // } else {
  //   console.log(ruser["isMer"]);
  //   res.send(ruser).status(469);
  // }
};

exports.createOrder = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const mer = "5fe4ae3de6f7e817e02a536f"; //only one merchent in system
  if (body) {
    const items = body.items.filter((item) => item.itemCode != null);
    const quantityMap = {};
    items.forEach((item) => {
      quantityMap[item.itemCode] = item.quantity;
    });
    const itemIds = items.map((item) => item.itemCode);
    const OrderIds = items.map((item) => {
      return {
        itemCode: item.itemCode,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        name: item.name,
        discp: "",
        brand: item.brand,
      };
    });
    const dbItems = await productController._getProductsByIds(itemIds);
    const totalBill = calculateBill(dbItems, quantityMap);

    const findLastOrder = await Orders.findOneAndUpdate(
      {
        user: mongoose.Types.ObjectId(req.user.id),
        paymentStatus: 0,
      },
      {
        paymentStatus: -2,
      }
    );
    let respos;
    if (findLastOrder) {
      // respos = findLastOrder;
      // respos.orderItems = OrderIds;
      // respos.totalAmountAfterDiscount = totalBill.totalAmountAfterDiscount;
      // respos.totalAmount = totalBill.totalAmount;
      console.log("order deleted.....");
    }
    // else {
    const newOrder = new Orders({
      orderItems: OrderIds,
      ...totalBill,
      user,
      mer: mer,
    });
    respos = await newOrder.save();
    // }

    console.log(respos);

    res.send({ respos }).status(201);
  }
};

exports.paymentResponce = async (req, res, next) => {
  console.log("seamlessBasic result hit");
  console.log(req.body);

  const txnTypes = enums.transactionStatusEnum;
  try {
    switch (req.body.txStatus) {
      case txnTypes.cancelled: {
        //buisness logic if payment was cancelled
        await Orders.findOneAndUpdate(
          { _id: req.body.ObjectId },
          { paymentStatus: -2, paymentMessage: "Cancelled by user" }
        );
        return res.status(200).send({
          status: "failed",
          message: "transaction was cancelled by user",
        });
      }
      case txnTypes.failed: {
        //buisness logic if payment failed
        const signature = req.body.signature;
        const derivedSignature = signatureVerification.signatureResponse1(
          req.body,
          config.secretKey
        );
        if (derivedSignature !== signature) {
          throw {
            name: "signature missmatch",
            message:
              "there was a missmatch in signatures genereated and received",
          };
        }
        await Orders.findOneAndUpdate(
          { _id: req.body.ObjectId },
          { paymentStatus: 1, paymentMessage: txnTypes.failed }
        );
        return res.status(200).send({
          status: "failed",
          message: "payment failure",
        });
      }
      case txnTypes.success: {
        //buisness logic if payments succeed
        const signature = req.body.signature;
        const derivedSignature = signatureVerification.signatureResponse1(
          req.body,
          config.secretKey
        );
        if (derivedSignature !== signature) {
          throw {
            name: "signature missmatch",
            message:
              "there was a missmatch in signatures genereated and received",
          };
        }

        await Orders.findOneAndUpdate(
          { _id: req.body.ObjectId },
          { paymentStatus: 2, paymentMessage: txnTypes.success }
        );
        return res.status(200).send({
          status: "success",
          message: "payment success",
        });
      }
    }
  } catch (err) {
    console.log("err caught");
    console.log(err);
    return res.status(500).send({
      status: "error",
      err: err,
      name: err.name,
      message: err.message,
    });
  }

  const signature = req.body.signature;
  const derivedSignature = signatureVerification.signatureResponse1(
    req.body,
    config.secretKey
  );
  if (derivedSignature === signature) {
    console.log("works");
    return res.status(200).send({
      status: req.body.txStatus,
    });
  } else {
    console.log("signature gotten: ", signature);
    console.log("signature derived: ", derivedSignature);
    return res.status(200).send({
      status: "error",
      message: "signature mismatch",
    });
  }
};
