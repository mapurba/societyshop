const express = require("express"),
  pay = express.Router();

const order = require("../controllers/order.controller");

pay.use("/", order.pay);

module.exports = pay;
