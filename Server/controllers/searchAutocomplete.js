const wget = require("node-wget");
const https = require("http");
const Items = require("../models/Items");
const { Mongoose } = require("mongoose");
const UPI = require("../models/Upi");

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
      // data = data.slice(0, 10);
      res.send({ data }).status(200);
    }
  );
};

exports.findUpi = async (req, res) => {
  let q = req.query;
  let Q = new RegExp(q.q, "i");
  let resp = await UPI.find({
    $or: [{ name: { $regex: Q } }, { upi: { $regex: Q } }],
  });

  if (resp) {
    res.send({ data: resp }).status(200);
  } else {
    res.status(489);
  }
};
