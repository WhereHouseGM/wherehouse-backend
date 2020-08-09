module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;
	describe("patch user", function() {
		let signUpResponse;
		let patchUserRequest = {};

		before(async function() {
			await setupDatabase(db);

			const signUpRequest = factories.users.newUser();
			signUpResponse = await apis.auths.signUp(signUpRequest);
		});

		it("should success", async function() {
			patchUserRequest = {
				name: "patchuser"
			};

			const res = await apis.users.patchUser(signUpResponse, signUpResponse.body.user.id, patchUserRequest);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to wrong access token", async function() {
			const res = await apis.users.patchUser({ body: { tokenType: "Bearer", accessToken: "aaaaa" } }, signUpResponse.body.user.id, patchUserRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
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

			const anotherSignUpResponse = await apis.auths.signUp(signUpRequest);

			const res = await apis.users.patchUser(anotherSignUpResponse, signUpResponse.body.user.id, patchUserRequest);

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to not existing user", async function() {
			const res = await apis.users.patchUser(signUpResponse, 99999, patchUserRequest);

			expect(res.status).to.equal(404);
			expect(res).to.satisfyApiSpec;
		});
	});
};