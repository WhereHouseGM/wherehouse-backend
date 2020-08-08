module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, getWarehouse, userFactory, expect } = dependencies;
	describe("get warehouse", function () {
		const signUpRequest = userFactory.newUser();
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
			expect(res).to.satisfyApiSpec;
		});

		it("failed since warehouse not exist", async function () {
			const { accessToken, tokenType } = signUpResponse;
			console.log(accessToken);
			const res = await getWarehouse(tokenType, accessToken, 2);

			expect(res.status).to.equal(404);
			expect(res).to.satisfyApiSpec;
		});
	});
};