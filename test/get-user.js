module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;

	describe("get user", function() {
		let signUpResponse;
		before(async function() {
			await setupDatabase(db);

			const signUpRequest = factories.users.newUser();

			signUpResponse = await apis.auths.signUp(signUpRequest);
		});

		it("should success", async function() {
			const res = await apis.users.getUser(signUpResponse, signUpResponse.body.user.id);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to wrong access token", async function() {
			const res = await apis.users.getUser({ body: { tokenType: "Bearer", accessToken: "aaaa" } }, signUpResponse.body.user.id);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to another users access token", async function() {
			const signUpRequest = factories.users.newUser();

			const anotherSignUpResponse = await apis.auths.signUp(signUpRequest);

			const res = await apis.users.getUser(anotherSignUpResponse, signUpResponse.body.user.id);

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to not existing user", async function() {
			const res = await apis.users.getUser(signUpResponse, 99999);

			expect(res.status).to.equal(404);
			expect(res).to.satisfyApiSpec;
		});
	});
};