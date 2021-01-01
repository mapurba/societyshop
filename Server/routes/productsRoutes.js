const express = require("express"),
  productRouter = express.Router();

const productController = require("../controllers/product.controller");
const auth = require("../login/auth");

productRouter.post("", auth.isAuthenticated, productController.addProduct);
productRouter.get(
  "/list",
  auth.isAuthenticated,
  productController.getAllProducts
);
productRouter.get(
  "/merchantProductlist",
  auth.isAuthenticated,
  productController.getProductFrommerchant
);
productRouter.get("/id", productController.getProductsByIds);

module.exports = productRouter;
