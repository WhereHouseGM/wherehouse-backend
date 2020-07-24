const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// import models
// import apis

// 404 handler
app.get("*", function(req, res) {
	res.status(404).send("Not Found");
});

// 500 handler
app.use(function(err, req, res) {
	res.status(500).send(err);
});

module.exports = app;