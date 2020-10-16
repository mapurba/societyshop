const express = require('express'), apiRouter = express.Router();

const path = require('path');
const multer = require('multer');
const upload = multer({dest: path.join(__dirname, 'uploads')});

/**
 * API keys and Passport configuration.
 */
const apiController = require('../controllers/api');
const auth = require('../login/auth');

/**
 * Path
 * */
apiRouter.get('/', apiController.getApi);
apiRouter.get('/aviary', apiController.getAviary);
apiRouter.get('/scraping', apiController.getScraping);
apiRouter.get('/facebook', auth.isAuthenticated, auth.isAuthorized, apiController.getFacebook);
apiRouter.get('/instagram', auth.isAuthenticated, auth.isAuthorized, apiController.getInstagram);
apiRouter.get('/upload', apiController.getFileUpload);
apiRouter.post('/upload', upload.single('myFile'), apiController.postFileUpload);

module.exports = apiRouter;
