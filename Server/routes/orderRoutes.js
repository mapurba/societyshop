const express = require('express'), apiRouter = express.Router();

const orderController = require('../controllers/order.controller');

apiRouter.get('/create', orderController.createOrder);

module.exports = apiRouter;
