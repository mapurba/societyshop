const express = require("express"),
  productRouter = express.Router();

const productController = require("../controllers/product.controller");

productRouter.post("", productController.addProduct);
productRouter.get("/list", productController.getAllProducts);
productRouter.get(
  "/merchantProductlist",
  productController.getProductFrommerchant
);
productRouter.get("/id", productController.getProductsByIds);

module.exports = productRouter;
