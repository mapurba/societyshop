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

/**
 *  Routing path
 * */
routerAdmin.use('/user', userRoutes);
routerAdmin.use('/auth', authRouter);
routerAdmin.use('/admin', adminRouter);
routerAdmin.use('/orders', orderRouter);

module.exports = routerAdmin;
