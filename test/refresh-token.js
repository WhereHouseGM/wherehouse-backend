module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, refreshToken, userFactory, expect } = dependencies;
	describe("refresh token", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			// TODO: create user factory
			const signUpRequest = userFactory.newUser();
			const signUpResponse = await signUp(signUpRequest);

			const res = await refreshToken(signUpResponse.body.tokenType, signUpResponse.body.refreshToken);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to expired refresh token", async function() {
			const res = await refreshToken("Bearer", "aaaa");

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};