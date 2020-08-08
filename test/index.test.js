const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiResponseValidator = require("chai-openapi-response-validator");
const { describe, it, before } = require("mocha");
const { setupDatabase } = require("./setup-database");
const path = require("path");
const app = require("../src/app");
const db = require("../src/models");
const { signUp } = require("./sign-up.test");

chai.use(chaiHttp);
chai.use(chaiResponseValidator(path.resolve("spec/wherehouse.v1.yaml")));
chai.should();

async function getUser(userId, tokenType, accessToken) {
	return chai.request(app)
		.get(`/v1/users/${userId}`)
		.set("Authorization", `${tokenType} ${accessToken}`);
}

async function postWarehouse(tokenType, accessToken, postWarehouseRequest) {
	return chai.request(app)
		.post("/v1/warehouses")
		.set("Authorization", `${tokenType} ${accessToken}`)
		.send(postWarehouseRequest);
}

async function patchUser(userId, patchUserRequest, tokenType, accessToken) {
	return chai.request(app)
		.patch(`/v1/users/${userId}`)
		.set("Authorization", `${tokenType} ${accessToken}`)
		.send(patchUserRequest);
}

require("./get-user")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	getUser,
	expect
});

require("./patch-user")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	patchUser,
	expect
});

require("./post-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	postWarehouse,
	expect
});