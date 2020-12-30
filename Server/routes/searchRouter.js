const express = require("express"),
  searchRouter = express.Router();

const searchController = require("../controllers/searchAutocomplete");

searchRouter.use("/ac", searchController.getSearchItem);
searchRouter.use("/gvpa", searchController.findUpi);


module.exports = searchRouter;
