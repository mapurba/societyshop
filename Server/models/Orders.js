const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    itemCode: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
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
      type: [orderItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalAmountAfterDiscount: {
      type: Number,
      required: true,
    },
    totalDiscount: {
      type: Number,
      required: false,
      default: 0,
    },
    paymentStatus: {
      type: String,
      required: false,
      default: 0,
      // 0 - payment penmding , -1 - payment failed , 1 - success , 2 - credit
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
  },
  { timestamps: true }
);

/**
 * Helper method for getting user's gravatar.
 */

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
