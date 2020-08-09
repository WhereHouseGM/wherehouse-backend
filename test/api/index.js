const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const chai = require("chai");
const app = require("../../src/app");

const apis = {};

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
	})
	.forEach(file => {
		const api = require(path.join(__dirname, file))(chai, app);
		apis[api.name] = api;
	});

module.exports = apis;