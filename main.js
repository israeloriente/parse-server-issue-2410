require("dotenv").config();
var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");
var parse = express();

const port = 1337;
const appName = "APP Parse";
const appId = "APP_ID";
const masterKey = "MASTER_KEY";
const serverURL = "http://localhost:1337/parse";
const databaseURI = "mongodb://localhost:27017/test";

/** Parse server configuration */
var api = new ParseServer({
  appName: appName,
  appId: appId,
  masterKey: masterKey,
  serverURL: serverURL,
  databaseURI: databaseURI,
  cloud: "./cloud/main",
  allowClientClassCreation: false,
});
/** Dashboard configuration */
var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: serverURL,
      appId: appId,
      masterKey: masterKey,
      appName: appName
    }
  ]
});

parse.use("/parse", api);
parse.use("/dashboard", dashboard);
parse.listen(port, function() {
  console.log("Running on port " + port + ".");
});
