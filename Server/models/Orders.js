const mongoose = require("mongoose");



const Price = {
  old: Number,
  new: Number,
};

const orderItemSchema = new mongoose.Schema(
  {
    itemCode: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    /*_id: {
        type: String, unique: true, required: true, dropDups: true
    },*/
    orderItems: {
      type: [],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalAmountAfterDiscount: {
      type: Number,
      // required: true,
    },
    totalDiscount: {
      type: Number,
      // required: false,
      default: 0,
    },
    paymentStatus: {
      type: Number,
      // required: false,
      default: 0,
      // 0 - payment penmding , -1 - payment failed , 1 - success , 2 - credit
    },
    paymentMessage: {
      type:  String,
    },
    orderStatus: {
      type: String,
      required: false,
      default: 0,
      // order staus o - waitng , 1 - accepted , 2 processing , 3 - delivered
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/**
 * Helper method for getting user's gravatar.
 */

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
