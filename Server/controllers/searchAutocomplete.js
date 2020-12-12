const wget = require("node-wget");
const https = require("http");

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

// req.end();
// req.on("error", function (err) {
//   console.log(err);
// });

//get auto complete search list
exports.getSearchItem = async (req, res) => {
  var params = "";
  var q = req.query;

  for (let i of Object.keys(q)) {
    console.log(i);
    params += i;
    params += "=";
    params += q[i];
    params += "&";
  }

  https.get("https://api.spacexdata.com/v3/launches?" + params, (resp) => {
    var body = { data: "" };

    resp.on("data", function (chunk) {
      body.data += chunk;
    });

    resp.on("end", function () {
      body.data = JSON.parse(body.data);
      res.send(body);
    });
  });
};
