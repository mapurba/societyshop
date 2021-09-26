/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const chalk = require("chalk");
const errorHandler = require("errorhandler");
const lusca = require("lusca");
// @ts-ignore
const dotenv = require("dotenv");
// @ts-ignore
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const expressValidator = require("express-validator");
const expressStatusMonitor = require("express-status-monitor");
const sass = require("node-sass-middleware");
const autoIncrement = require("mongoose-auto-increment");
const http = require("https");
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env.example" });

/**
 * import routes
 *
 */

const apiRoutes = require("./routes/routeAdmin");
const { collection } = require("./models/User");
/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
console.log(process.env.MONGODB_URI);

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);

try {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  // @ts-ignore
  mongoose.connect(process.env.MONGODB_URI, options).then(
    // @ts-ignore
    (connect) => {
      console.log("connected it seams");
    },
    (err) => {
      console.log("erroe");

      console.log(err);
    }
  );
} catch (err) {
  console.log(err);
}





mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    // @ts-ignore
    chalk.red("✗")
  );
  process.exit();
});

/**
 * Express configuration.
 */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8089);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(expressStatusMonitor());
app.use(compression());
app.use(
  sass({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    // @ts-ignore
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use((req, res, next) => {
//   if (req.path === '/api/upload') {
//     next();
//   } else {
//     lusca.csrf()(req, res, next);
//   }
// });
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.disable("x-powered-by");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// @ts-ignore
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    // @ts-ignore
    req.session.returnTo = req.originalUrl;
  } else if (
    req.user &&
    (req.path === "/account" || req.path.match(/^\/api/))
  ) {
    // @ts-ignore
    req.session.returnTo = req.originalUrl;
  }
  next();
});
// @ts-ignore
app.use(function (req, res, next) {
  // res.header('Content-Type', 'application/json');
  next();
});


app.use("/api/", apiRoutes);

  
app.get("/api/data", function (req, res) {
  // console.log(req.query)

  var params = "";
  var q = req.query;

  for (let i of Object.keys(q)) {
    console.log(i);
    params += i;
    params += "=";
    params += q[i];
    params += "&";
  }

  let apiparms = {
    app_id: "5f582589",
    app_key: "b439aeba063d17fb6cd92cfd41670443",
    // "ingr":
  };

  for (let i of Object.keys(apiparms)) {
    console.log(i);
    params += i;
    params += "=";
    params += apiparms[i];
    params += "&";
  }
  console.log(params);
  http.get(
    "https://api.edamam.com/api/food-database/v2/parser?" + params,
    (resp) => {
      var body = { data: "" };

      resp.on("data", function (chunk) {
        body.data += chunk;
      });

      resp.on("end", function () {
        body.data = JSON.parse(body.data);
        res.send({ body }).status(200);
      });
    }
  );
});

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  // @ts-ignore
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  // @ts-ignore
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason)
  //process.exit(1)
});

module.exports = app;
