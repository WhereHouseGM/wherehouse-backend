module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;
	describe("get warehouse", function () {
		const signUpRequest = factories.users.newUser();
		const postGenralWarehouseRequest = factories.warehouses.newGeneral();
		let signUpResponse;
		let postWarehouseResponse;

		before(async function () {
			await setupDatabase(db);
			signUpResponse = await apis.auths.signUp(signUpRequest);
			postWarehouseResponse = await apis.warehouses.postWarehouse(signUpResponse, postGenralWarehouseRequest);
		});

		it("should success", async function () {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouses.getWarehouse(signUpResponse, warehouse.id);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function () {
			const res = await apis.warehouses.getWarehouse({ body: { tokenType: "Bearer", accessToken: "" } }, 1);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed since warehouse not exist", async function () {
			const res = await apis.warehouses.getWarehouse(signUpResponse, 2);

			expect(res.status).to.equal(404);
			expect(res).to.satisfyApiSpec;
		});
	});
};