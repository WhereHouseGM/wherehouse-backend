module.exports = (dependencies) => {
	const { mocha, chai, setupDatabase, db, apis, factories } = dependencies;
	const { describe, before, it } = mocha;
	const { expect } = chai;
	describe("get delivery types", function() {
		let signUpResponse;
		before(async function() {
			await setupDatabase(db);

			const signUpRequest = factories.users.newUser();

			signUpResponse = await apis.auths.signUp(signUpRequest);
		});

		it("should success", async function() {
			const res = await apis.deliveryTypes.getDeliveryTypes(signUpResponse);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to wrong access token", async function() {
			const res = await apis.deliveryTypes.getDeliveryTypes({ body: { tokenType: "Bearer", accessToken: "aaaa" } });

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};