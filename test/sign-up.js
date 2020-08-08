module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, userFactory, expect } = dependencies;
	describe("sign up", function() {
		const signUpRequest = userFactory.newUser();

		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			const res = await signUp(signUpRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to conflict error", async function() {
			const res = await signUp(signUpRequest);

			expect(res.status).to.equal(409);
			expect(res).to.satisfyApiSpec;
		});
	});
};