module.exports = (dependencies) => {
	const { mocha, chai, setupDatabase, db, apis, factories } = dependencies;
	const { describe, before, it } = mocha;
	const { expect } = chai;
	describe("sign up", function() {
		const signUpRequest = factories.users.newUser();

		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			const res = await apis.auths.signUp(signUpRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to conflict error", async function() {
			const res = await apis.auths.signUp(signUpRequest);

			expect(res.status).to.equal(409);
			expect(res).to.satisfyApiSpec;
		});
	});
};