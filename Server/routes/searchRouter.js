const express = require("express"),
  searchRouter = express.Router();

const searchController = require("../controllers/searchAutocomplete");

searchRouter.use("/ac", searchController.getSearchItem);

module.exports = searchRouter;
