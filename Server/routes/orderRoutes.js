
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


    module.exports = apiRouter;