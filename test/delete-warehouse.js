module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;
	describe("delete warehouse", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await apis.auths.signUp(signUpRequest);
			postWarehouseResponse = await apis.warehouses.postWarehouse(signUpResponse, postWarehouseRequest);
		});

		it("should success", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouses.deleteWarehouse(signUpResponse, warehouse.id);

			expect(res.status).to.equal(204);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			postWarehouseResponse = await apis.warehouses.postWarehouse(signUpResponse, postWarehouseRequest);
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouses.deleteWarehouse({ body: { tokenType: "Bearer", accessToken: "" } }, warehouse.id);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to another users access token", async function() {
			const anotherUserSignUpResponse = await apis.auths.signUp(factories.users.newUser());
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouses.deleteWarehouse(anotherUserSignUpResponse, warehouse.id);

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});
	});
}