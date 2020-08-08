module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, getWarehouse, expect } = dependencies;
	describe("get warehouse", function () {
		const signUpRequest = {
			name: "string1",
			email: "use21@exa2mple.com",
			password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
			type: "SHIPPER",
			telephoneNumber: "string",
			companyName: "string",
			phoneNumber: "string"
		};
		let signUpResponse;

		before(async function () {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			signUpResponse = signUpResponse.body;
		});

		it("should success", async function () {
			// TODO: create warehouse
		});

		it("failed due to invalid access token", async function () {
			const res = await getWarehouse("Bearer", "", 1);

			expect(res.status).to.equal(401);
			expect(res.body).not.to.be.empty;
		});

		it("failed since warehouse not exist", async function () {
			const { accessToken, tokenType } = signUpResponse;
			console.log(accessToken);
			const res = await getWarehouse(tokenType, accessToken, 2);

			expect(res.status).to.equal(404);
			expect(res.body).not.to.be.empty;
		});
	});
};