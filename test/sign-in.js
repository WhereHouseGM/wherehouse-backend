module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, signIn, expect } = dependencies;

	describe("sign in", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			// TODO: create user factory
			const signUpRequest = {
				name: "string1",
				email: "use21@exa2mple.com",
				password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
				type: "SHIPPER",
				telephoneNumber: "string",
				companyName: "string",
				phoneNumber: "string"
			};
			await signUp(signUpRequest);

			const signInRequest = {
				email: "use21@exa2mple.com",
				password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
			};

			const res = await signIn(signInRequest);

			expect(res.status).to.equal(200);
			expect(res.body).not.to.be.empty;
			expect(res.body.accessToken).to.be.a("string");
			expect(res.body.refreshToken).to.be.a("string");
			expect(res.body.tokenType).to.be.a("string");
			expect(res.body.user).not.to.be.empty;
		});
	});
};