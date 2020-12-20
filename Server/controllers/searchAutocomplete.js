const wget = require("node-wget");
const https = require("http");
const Items = require("../models/Items");
const { Mongoose } = require("mongoose");

const options = {
  protocol: "https",
  host: "raw.github.com",
  path: "/Fyrd/caniuse/master/data.json",
  proxy: {},
  method: "GET",
};
options.proxy.protocol = "http";
options.proxy.host = "someproxy.org";
options.proxy.port = 1337;
options.proxy.proxyAuth = "{basic auth}";
options.proxy.headers = { "User-Agent": "Node" };

// const limit = 10;
const maxTimeMS = 20;

exports.getSearchItem = async (req, res) => {
  const q = req.query;
  let Q = new RegExp(q.q, "i");
  Items.find({ name: { $regex: Q } }, function (err, data) {
    if (err) return handleError(err);
    data = data.slice(0, 10);
    res.send({ data }).status(200);
  });
};
