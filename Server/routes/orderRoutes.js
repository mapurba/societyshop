const express = require('express'), apiRouter = express.Router();

const apiController = require('../controllers/api');

apiRouter.get('/', apiController.getApi);

module.exports = apiRouter;
