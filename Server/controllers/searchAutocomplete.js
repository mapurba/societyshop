const wget = require("node-wget");
const https = require("http");
const Items = require("../models/Items");
const { Mongoose } = require("mongoose");


// const limit = 10;
const maxTimeMS = 20;

exports.getSearchItem = async (req, res) => {
  const q = req.query;
  let Q = new RegExp(q.q, "i");
  Items.find(
    {
      $or: [
        { name: { $regex: Q } },
        { discp: { $regex: Q } },
        { brand: { $regex: Q } },
        { image: { $regex: Q } },
      ],
    },
    function (err, data) {
      if (err) return handleError(err);
      data = data.slice(0, 10);
      res.send({ data }).status(200);
    }
  );
};
