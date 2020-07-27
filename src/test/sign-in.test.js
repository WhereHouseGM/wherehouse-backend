const { describe, it, before } = require("mocha");
const { signUp } = require("./sign-up.test");
const chai = require("chai");
const db = require("../models");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

async function signIn(signInRequest) {
	return chai.request(app)
		.post("/v1/auth/sign-in")
		.send(signInRequest);
}

describe("sign in", function() {
	before(async function() {
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
		await signUp(signUpRequest);
		
		const signInRequest = {
			email: "use21@exa2mple.com",
			password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
		};

		const res = await signIn(signInRequest);

		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.empty;
		expect(res.body.accessToken).not.to.be.empty;
		expect(res.body.refreshToken).not.to.be.empty;
		expect(res.body.tokenType).not.to.be.empty;
	});
});