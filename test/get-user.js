module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, getUser, factories, expect } = dependencies;

	describe("get user", function() {
		let signUpResponse;
		before(async function() {
			await setupDatabase(db);

			const signUpRequest = factories.users.newUser();

			signUpResponse = await signUp(signUpRequest);
		});

		it("should success", async function() {
			const res = await getUser(signUpResponse.body.user.id, signUpResponse.body.tokenType, signUpResponse.body.accessToken);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to wrong access token", async function() {
			const res = await getUser(signUpResponse.body.user.id, signUpResponse.body.tokenType, "aaaaa");

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to another users access token", async function() {
			const signUpRequest = factories.users.newUser();

			const anotherSignUpResponse = await signUp(signUpRequest);

			const res = await getUser(signUpResponse.body.user.id, anotherSignUpResponse.body.tokenType, anotherSignUpResponse.body.accessToken);

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to not existing user", async function() {
			const res = await getUser(99999, signUpResponse.body.tokenType, signUpResponse.body.accessToken);

			expect(res.status).to.equal(404);
			expect(res).to.satisfyApiSpec;
		});
	});
};