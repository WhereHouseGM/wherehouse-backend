module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, deleteWarehouse, postWarehouse, signUp, userFactory, warehouseFactory, expect } = dependencies;
	describe("delete warehouse", function() {
		const signUpRequest = userFactory.newUser();
		const postWarehouseRequest =  warehouseFactory.newGeneral();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			postWarehouseResponse = await postWarehouse(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseRequest);
		});

		it("should success", async function() {
			const { tokenType, accessToken } = signUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const res = await deleteWarehouse(tokenType, accessToken, warehouse.id);

			expect(res.status).to.equal(204);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			postWarehouseResponse = await postWarehouse(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseRequest);
			const { warehouse } = postWarehouseResponse.body;
			const res = await deleteWarehouse("Bearer", "", warehouse.id);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to another users access token", async function() {
			const anotherUserSignUpResponse = await signUp(userFactory.newUser());
			const { tokenType, accessToken } = anotherUserSignUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const res = await deleteWarehouse(tokenType, accessToken, warehouse.id);

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});
	});
}