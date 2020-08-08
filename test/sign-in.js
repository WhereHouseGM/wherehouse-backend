module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, signIn, userFactory, expect } = dependencies;

	describe("sign in", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			// TODO: create user factory
			const signUpRequest = userFactory.newUser();
			await signUp(signUpRequest);

			const signInRequest = {
				email: signUpRequest.email,
				password: signUpRequest.password,
			};

			const res = await signIn(signInRequest);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});
	});
};