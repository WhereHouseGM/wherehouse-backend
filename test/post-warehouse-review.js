module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;
	describe("post warehouse review", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		const postWarehouseReviewRequest = factories.warehouseReviews.newReview();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await apis.auths.signUp(signUpRequest);
			postWarehouseResponse = await apis.warehouses.postWarehouse(signUpResponse, postWarehouseRequest);
		});

		it("should success", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouseReviews.postWarehouseReview(signUpResponse, warehouse.id, postWarehouseReviewRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouseReviews.postWarehouseReview({ body: { tokenType: "Bearer", accessToken: "" } }, warehouse.id, postWarehouseReviewRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
}