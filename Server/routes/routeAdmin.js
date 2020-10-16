var express = require('express');
// var app 		= express();
var routerAdmin = express.Router();

/**
 * import routes
 * 
 */

const apiRoutes = require('./apiRoutes');
const userRoutes = require('./userRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const orderRouter = require('./orderRoutes')


// routerAdmin.use('/user', userRoutes);
// app.use('/api/', apiRoutes);
// routerAdmin.use('/auth', authRouter);
routerAdmin.use('/admin', adminRouter);
// routerAdmin.use('/orders', orderRouter);


module.exports = routerAdmin;