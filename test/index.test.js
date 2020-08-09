const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiResponseValidator = require("chai-openapi-response-validator");
const { describe, it, before } = require("mocha");
const { setupDatabase } = require("./setup-database");
const path = require("path");
const db = require("../src/models");
const factories = require("./factory");
const apis = require("./api");

chai.use(chaiHttp);
chai.use(chaiResponseValidator(path.resolve("spec/wherehouse.v1.yaml")));
chai.should();

require("./sign-in")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./sign-up")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./get-user")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./patch-user")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./post-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./get-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./get-warehouses")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./patch-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./delete-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./refresh-token")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./post-warehouse-review")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./get-warehouse-reviews")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});

require("./delete-warehouse-review")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	apis,
	factories,
	expect
});