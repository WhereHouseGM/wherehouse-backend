const { describe, before, it } = require("mocha");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const db = require("../src/models");
const app = require("../src/app");
const { signUp } = require("./sign-up.test");
const { setupDatabase } = require("./setup-database");
const qs = require("qs");

chai.use(chaiHttp);
chai.should();

async function getWarehouse (tokenType, accessToken, warehouseId, query) {
	const queryString = qs.stringify(query);
	return chai.request(app)
		.get(`/v1/warehouses/${warehouseId}?${queryString}`)
		.set("Authorization", `${tokenType} ${accessToken}`);
}

describe("get warehouse", function () {
	const signUpRequest = {
		name: "string1",
		email: "use21@exa2mple.com",
		password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
		type: "SHIPPER",
		telephoneNumber: "string",
		companyName: "string",
		phoneNumber: "string"
	};
	let signUpResponse;

	before(async function () {
		await setupDatabase(db);
		signUpResponse = await signUp(signUpRequest);
		signUpResponse = signUpResponse.body;
	});

	it("should success", async function () {
		// TODO: create warehouse
	});

	it("failed due to invalid access token", async function () {
		const res = await getWarehouse("Bearer", "", 1);

		expect(res.status).to.equal(401);
		expect(res.body).not.to.be.empty;
	});

	it("failed since warehouse not exist", async function () {
		const { accessToken, tokenType } = signUpResponse;
		console.log(accessToken);
		const res = await getWarehouse(tokenType, accessToken, 2);

		expect(res.status).to.equal(404);
		expect(res.body).not.to.be.empty;
	});
});