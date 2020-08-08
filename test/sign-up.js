module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, expect } = dependencies;
	describe("sign up", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("should success", async function() {
			const signUpRequest = {
				name: "string1",
				email: "use21@exa2mple.com",
				password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
				type: "SHIPPER",
				telephoneNumber: "string",
				companyName: "string",
				phoneNumber: "string"
			};

			const res = await signUp(signUpRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to conflict error", async function() {
			const signUpRequest = {
				name: "string1",
				email: "use21@exa2mple.com",
				password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
				type: "SHIPPER",
				telephoneNumber: "string",
				companyName: "string",
				phoneNumber: "string"
			};

			const res = await signUp(signUpRequest);

			expect(res.status).to.equal(409);
			expect(res).to.satisfyApiSpec;
		});
	});
};