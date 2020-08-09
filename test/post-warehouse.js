module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, postWarehouse, factories, expect } = dependencies;

	describe("post warehouse", function () {
		const signUpRequest = factories.users.newUser();
		const postGeneralWarehouseRequest = factories.warehouses.newGeneral();
		const postAgencyWarehouseRequest = factories.warehouses.newAgency();

		let signUpResponse;

		before(async function () {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			signUpResponse = signUpResponse.body;
		});

		it("should success(general warehouse)", async function () {
			const { tokenType, accessToken } = signUpResponse;
			const res = await postWarehouse(tokenType, accessToken, postGeneralWarehouseRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should success(agency warehouse)", async function () {
			const { tokenType, accessToken } = signUpResponse;
			const res = await postWarehouse(tokenType, accessToken, postAgencyWarehouseRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to invalid token", async function () {
			const res = await postWarehouse("Bearer", "", postAgencyWarehouseRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to invalid token", async function () {
			const res = await postWarehouse("Bearer", "", postAgencyWarehouseRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};