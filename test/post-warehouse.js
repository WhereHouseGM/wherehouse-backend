module.exports = (dependencies) => {
	const { mocha, chai, setupDatabase, db, apis, factories } = dependencies;
	const { describe, before, it } = mocha;
	const { expect } = chai;
	describe("post warehouse", function () {
		const signUpRequest = factories.users.newUser();
		const postGeneralWarehouseRequest = factories.warehouses.newGeneral();
		const postAgencyWarehouseRequest = factories.warehouses.newAgency();

		let signUpResponse;

		before(async function () {
			await setupDatabase(db);
			signUpResponse = await apis.auths.signUp(signUpRequest);
		});

		it("should success(general warehouse)", async function () {
			const res = await apis.warehouses.postWarehouse(signUpResponse, postGeneralWarehouseRequest);

			console.log("success general warehouse");
			console.log(res.body);
			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should success(agency warehouse)", async function () {
			const res = await apis.warehouses.postWarehouse(signUpResponse, postAgencyWarehouseRequest);

			console.log("success agency warehouse");
			console.log(res.body);
			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to invalid token", async function () {
			const res = await apis.warehouses.postWarehouse({
				body: {
					tokenType: "Bearer",
					accessToken: ""
				}
			}, postAgencyWarehouseRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};