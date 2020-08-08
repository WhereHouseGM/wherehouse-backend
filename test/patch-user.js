module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, patchUser, expect } = dependencies;
	describe("patch user", function() {
		let signUpResponse;
		let patchUserRequest = {};

		before(async function() {
			await setupDatabase(db);

			const signUpRequest = {
				name: "string1",
				email: "use21@exa2mple.com",
				password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
				type: "SHIPPER",
				telephoneNumber: "string",
				companyName: "string",
				phoneNumber: "string"
			};

			signUpResponse = await signUp(signUpRequest);
		});

		it("should success", async function() {
			patchUserRequest = {
				name: "patchuser"
			};

			const res = await patchUser(signUpResponse.body.user.id, patchUserRequest, signUpResponse.body.tokenType, signUpResponse.body.accessToken);

			expect(res.status).to.equal(200);
			expect(res.body).not.to.be.empty;
			expect(res.body.id).to.be.a("number");
			expect(res.body.name).to.be.a("string");
			expect(res.body.name).to.be.equal("patchuser");
			expect(res.body.email).to.be.a("string");
			expect(res.body.type).to.be.a("string");
			expect(res.body.phoneNumber).to.be.a("string");
		});

		it("should fail due to wrong access token", async function() {
			const res = await patchUser(signUpResponse.body.user.id, patchUserRequest, signUpResponse.body.tokenType, "aaaaa");

			expect(res.status).to.equal(401);
			expect(res.body).not.to.be.empty;
			expect(res.body.message).to.be.a("string");
		});

		it("should fail due to another users access token", async function() {
			const signUpRequest = {
				name: "string122",
				email: "use2122@exa2mple.com",
				password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
				type: "SHIPPER",
				telephoneNumber: "string",
				companyName: "string",
				phoneNumber: "string"
			};

			const anotherSignUpResponse = await signUp(signUpRequest);

			const res = await patchUser(signUpResponse.body.user.id, patchUserRequest, anotherSignUpResponse.body.tokenType, anotherSignUpResponse.body.accessToken);

			expect(res.status).to.equal(403);
			expect(res.body).not.to.be.empty;
			expect(res.body.message).to.be.a("string");
		});

		it("should fail due to not existing user", async function() {
			const res = await patchUser(99999, patchUserRequest, signUpResponse.body.tokenType, signUpResponse.body.accessToken);

			expect(res.status).to.equal(404);
			expect(res.body).not.to.be.empty;
			expect(res.body.message).to.be.a("string");
		});
	});
};