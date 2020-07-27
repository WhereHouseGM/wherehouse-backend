const { signUp } = require("./sign-up.test");
const chai = require("chai");
const db = require("../models");
const jwt = require("jsonwebtoken");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

async function refreshToken(tokenType, refreshToken) {
	return chai.request(app)
		.post("/v1/auth/refresh-token")
		.set("Authorization", `${tokenType} ${refreshToken}`)
}

describe("refresh token", function() {
	before(async function() {
		console.log("=========== refresh token before ===========");
		await db.sequelize.sync({ force: true });
	});
	
	it("should success", async function() {
		// TODO: create user factory
		const signUpRequest = {
			name: "string1",
			email: "use21@exa2mple.com",
			password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
			type: "SHIPPER",
			telephoneNumber: "string",
			companyName: "string",
			phoneNumber: "string"
		};
		const signUpResponse = await signUp(signUpRequest);

		const res = await refreshToken(signUpResponse.body.tokenType, signUpResponse.body.refreshToken);

		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.empty;
		expect(res.body.accessToken).not.to.be.empty;
		expect(res.body.refreshToken).not.to.be.empty;
		expect(res.body.tokenType).not.to.be.empty;
	});

	it("should fail due to expired refresh token", async function() {
		const res = await refreshToken("Bearer", "aaaa");

		expect(res.status).to.equal(401);
		expect(res.body).not.to.be.empty;
		expect(res.body.message).not.to.be.empty;
	});
});