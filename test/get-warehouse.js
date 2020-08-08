module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, getWarehouse, postWarehouse, userFactory, warehouseFactory, expect } = dependencies;
	describe("get warehouse", function () {
		const signUpRequest = userFactory.newUser();
		const postGenralWarehouseRequest = warehouseFactory.newGeneral();
		let signUpResponse;
		let postWarehouseResponse;

		before(async function () {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			signUpResponse = signUpResponse.body;
			postWarehouseResponse = await postWarehouse(signUpResponse.tokenType, signUpResponse.accessToken, postGenralWarehouseRequest);
			postWarehouseResponse = postWarehouseResponse.body;
		});

		it("should success", async function () {
			const { tokenType, accessToken } = signUpResponse;
			const { warehouse } = postWarehouseResponse;
			const res = await getWarehouse(tokenType, accessToken, warehouse.id);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function () {
			const res = await getWarehouse("Bearer", "", 1);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed since warehouse not exist", async function () {
			const { accessToken, tokenType } = signUpResponse;
			const res = await getWarehouse(tokenType, accessToken, 2);

			expect(res.status).to.equal(404);
			expect(res).to.satisfyApiSpec;
		});
	});
};