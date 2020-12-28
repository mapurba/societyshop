const express = require('express'), orderRouter = express.Router();

const orderController = require('../controllers/order.controller');

orderRouter.get('/list', orderController.getAllOrders);
orderRouter.post('/create', orderController.createOrder);
orderRouter.post("/payment/responce", orderController.paymentResponce);

module.exports = orderRouter;
