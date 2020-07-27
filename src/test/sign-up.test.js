const { describe, it, before } = require("mocha");
const chai = require("chai");
const db = require("../models");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

async function signUp(signUpRequest) {
	return chai.request(app)
		.post("/v1/auth/sign-up")
		.send(signUpRequest);
}

describe("sign up", function() {
	before(async function() {
		await db.sequelize.sync({ force: true });
	});

	it("should success", async function() {
		const signUpRequest = {
			name: "string1",
			email: "use21@exa2mple.com",
			password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
			type: "SHIPPER",
			telephoneNumber: "string",
			companyName: "string",
			phoneNumber: "string"
		};

		const res = await signUp(signUpRequest);

		expect(res.status).to.equal(201);
		expect(res.body).not.to.be.empty;
		expect(res.body.accessToken).not.to.be.empty;
		expect(res.body.refreshToken).not.to.be.empty;
		expect(res.body.tokenType).not.to.be.empty;
	});

	it("should fail due to conflict error", async function() {
		const signUpRequest = {
			name: "string1",
			email: "use21@exa2mple.com",
			password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
			type: "SHIPPER",
			telephoneNumber: "string",
			companyName: "string",
			phoneNumber: "string"
		};

		const res = await signUp(signUpRequest);

		expect(res.status).to.equal(409);
		expect(res.body).not.to.be.empty;
		expect(res.body.message).not.to.be.empty;
	});
});

exports.signUp = signUp;