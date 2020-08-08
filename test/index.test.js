const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiResponseValidator = require("chai-openapi-response-validator");
const { describe, it, before } = require("mocha");
const { setupDatabase } = require("./setup-database");
const path = require("path");
const qs = require("qs");
const app = require("../src/app");
const db = require("../src/models");

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

async function signIn(signInRequest) {
	return chai.request(app)
		.post("/v1/auth/sign-in")
		.send(signInRequest);
}

async function signUp(signUpRequest) {
	return chai.request(app)
		.post("/v1/auth/sign-up")
		.send(signUpRequest);
}

async function getWarehouse (tokenType, accessToken, warehouseId, query) {
	const queryString = qs.stringify(query);
	return chai.request(app)
		.get(`/v1/warehouses/${warehouseId}?${queryString}`)
		.set("Authorization", `${tokenType} ${accessToken}`);
}

async function getWarehouses() {
	return chai.request(app)
		.get("/v1/warehouses");
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

require("./sign-in")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	signIn,
	expect
});

require("./sign-up")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	expect
});

require("./get-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	getWarehouse,
	expect
});

require("./get-warehouses")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	getWarehouses,
	expect
});

