const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// import models
const db = require("./models");
db.sequelize.sync();

// import apis
const v1 = require("./apis/v1");
app.use("/v1", v1);

// 404 handler
app.use(function(req, res) {
	res.status(404).json({ message: "Not Found Error" });
});

// error logger
const errorLogger = require("./middlewares/error-logger");
app.use(errorLogger);

// 500 handler
const errorHandler = require("./middlewares/error-handler");
app.use(errorHandler);

module.exports = app;