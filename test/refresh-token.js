module.exports = (dependencies) => {
	const { mocha, chai, setupDatabase, db, apis, factories } = dependencies;
	const { describe, before, it } = mocha;
	const { expect } = chai;
	describe("refresh token", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			const signUpRequest = factories.users.newUser();
			const signUpResponse = await apis.auths.signUp(signUpRequest);

			const res = await apis.auths.refreshToken(signUpResponse);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to expired refresh token", async function() {
			const res = await apis.auths.refreshToken({ body: { tokenType: "Bearer", refreshToken: "" } });

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};