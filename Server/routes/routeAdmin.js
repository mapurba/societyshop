const express = require('express');
const routerAdmin = express.Router();



/**
 * Import routes
 */
const apiRoutes = require('./apiRoutes');
const userRoutes = require('./userRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const orderRouter = require('./orderRoutes');
const productRouter = require("./productsRoutes");
const searchRouter = require("./searchRouter");
const pay = require("./pay");

/**
 *  Routing path
 * */
routerAdmin.use('/user', userRoutes);
routerAdmin.use('/auth', authRouter);
routerAdmin.use('/admin', adminRouter);
routerAdmin.use('/orders', orderRouter);
routerAdmin.use("/products", productRouter);
routerAdmin.use("/search", searchRouter);
routerAdmin.use("/pay", pay);

module.exports = routerAdmin;
