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
const factories = require("./factory");

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

async function refreshToken(tokenType, refreshToken) {
	return chai.request(app)
		.post("/v1/auth/refresh-token")
		.set("Authorization", `${tokenType} ${refreshToken}`);
}

async function getWarehouse (tokenType, accessToken, warehouseId) {
	return chai.request(app)
		.get(`/v1/warehouses/${warehouseId}`)
		.set("Authorization", `${tokenType} ${accessToken}`);
}

async function patchWarehouse (tokenType, accessToken, warehouseId, patchWarehouseRequest) {
	return chai.request(app)
		.patch(`/v1/warehouses/${warehouseId}`)
		.set("Authorization", `${tokenType} ${accessToken}`)
		.send(patchWarehouseRequest);
}

async function deleteWarehouse (tokenType, accessToken, warehouseId) {
	return chai.request(app)
		.delete(`/v1/warehouses/${warehouseId}`)
		.set("Authorization", `${tokenType} ${accessToken}`)
}

async function getWarehouses(query) {
	const queryString = qs.stringify(query);
	return chai.request(app)
		.get(`/v1/warehouses?${queryString}`);
}

async function postWarehouseReview(tokenType, accessToken, warehouseId, postWarehouseReviewRequest) {
	return chai.request(app)
		.post(`/v1/warehouses/${warehouseId}/reviews`)
		.set("Authorization", `${tokenType} ${accessToken}`)
		.send(postWarehouseReviewRequest);
}

async function getWarehouseReviews(tokenType, accessToken, warehouseId) {
	return chai.request(app)
		.get(`/v1/warehouses/${warehouseId}/reviews`)
		.set("Authorization", `${tokenType} ${accessToken}`);
}

async function deleteWarehouseReview(tokenType, accessToken, warehouseId, warehouseReviewId) {
	return chai.request(app)
		.delete(`/v1/warehouses/${warehouseId}/reviews/${warehouseReviewId}`)
		.set("Authorization", `${tokenType} ${accessToken}`);
}

require("./sign-in")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	signIn,
	factories,
	expect
});

require("./sign-up")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	factories,
	expect
});

require("./get-user")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	getUser,
	factories,
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
	factories,
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
	factories,
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
	postWarehouse,
	factories,
	expect
});

require("./get-warehouses")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	getWarehouses,
	postWarehouse,
	signUp,
	factories,
	expect
});

require("./patch-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	patchWarehouse,
	postWarehouse,
	signUp,
	factories,
	expect
});

require("./delete-warehouse")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	deleteWarehouse,
	postWarehouse,
	signUp,
	factories,
	expect
});

require("./refresh-token")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	signUp,
	refreshToken,
	factories,
	expect
});

require("./post-warehouse-review")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	postWarehouse,
	signUp,
	postWarehouseReview,
	factories,
	expect
});

require("./get-warehouse-reviews")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	postWarehouse,
	signUp,
	getWarehouseReviews,
	postWarehouseReview,
	factories,
	expect
});

require("./delete-warehouse-review")({
	describe,
	before,
	it,
	setupDatabase,
	db,
	postWarehouse,
	signUp,
	deleteWarehouseReview,
	postWarehouseReview,
	factories,
	expect
});