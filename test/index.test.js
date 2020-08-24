const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiResponseValidator = require("chai-openapi-response-validator");
const { setupDatabase } = require("./util/setup-database");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const db = require("../src/models");
const factories = require("./factory");
const apis = require("./api");

chai.use(chaiHttp);
chai.use(chaiResponseValidator(path.resolve("spec/wherehouse.v1.yaml")));
chai.should();

console.log(Object.keys(mocha));
fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
	})
	.forEach(file => {
		require(path.join(__dirname, file))({
			mocha,
			chai,
			setupDatabase,
			db,
			apis,
			factories
		});
	});
