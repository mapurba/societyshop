const express = require('express'), orderRouter = express.Router();

const orderController = require('../controllers/order.controller');

orderRouter.get('/list', orderController.getAllOrders);
orderRouter.post('/create', orderController.createOrder);
orderRouter.post("/validate", orderController.validateUpi);
orderRouter.post("/delivery", orderController.updateOrder);
orderRouter.use("/payment/responce", orderController.paymentResponce);
orderRouter.use("/payment/link", orderController.createPaymentRequestLink);
orderRouter.use("/payment/upir", orderController.upir);

module.exports = orderRouter;
