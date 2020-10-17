const express = require('express'), productRouter = express.Router();

const productController = require('../controllers/productController');


productRouter.post("",productController.addProduct);
productRouter.get('/list', productController.getAllProducts);




module.exports = productRouter;
