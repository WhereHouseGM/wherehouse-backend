module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;

	describe("sign in", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			// TODO: create user factory
			const signUpRequest = factories.users.newUser();
			await apis.auths.signUp(signUpRequest);

			const signInRequest = {
				email: signUpRequest.email,
				password: signUpRequest.password,
			};

			const res = await apis.auths.signIn(signInRequest);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});
	});
};