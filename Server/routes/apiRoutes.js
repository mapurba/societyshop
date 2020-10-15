
var express = require('express'),
apiRouter = express.Router();

    const multer = require('multer');
    const path = require('path');
    const apiController = require('../controllers/api');
    const upload = multer({ dest: path.join(__dirname, 'uploads') });
    const passport = require('passport');

    /**
    * API keys and Passport configuration.
    */
    const passportConfig = require('../config/passport');




    apiRouter.get('/', apiController.getApi);
    apiRouter.get('/aviary', apiController.getAviary);
    apiRouter.get('/scraping', apiController.getScraping);
    // apiRouter.get('/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
    apiRouter.get('/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
    apiRouter.get('/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
    apiRouter.get('/upload', apiController.getFileUpload);
    apiRouter.post('/upload', upload.single('myFile'), apiController.postFileUpload);

    module.exports = apiRouter;