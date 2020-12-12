const express = require("express"),
  searchRouter = express.Router();

const searchController = require("../controllers/searchAutocomplete");

searchRouter.get("/ac", searchController.getSearchItem);

module.exports = searchRouter;
