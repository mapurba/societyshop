const express = require('express'), adminRouter = express.Router();

const auth = require('../login/auth');
/**
 * API keys and Passport configuration.
 */
const adminController = require('../controllers/admin')

adminRouter.get('/tasklist', auth.isAuthenticatedAdmin, adminController.getAllTask);
adminRouter.post('/task/approve', auth.isAuthenticatedAdmin, adminController.approveTask);

module.exports = adminRouter;
