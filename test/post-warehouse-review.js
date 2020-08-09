module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, postWarehouse, signUp, postWarehouseReview, factories, expect } = dependencies;
	describe("post warehouse review", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		const postWarehouseReviewRequest = factories.warehouseReviews.newReview();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			postWarehouseResponse = await postWarehouse(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseRequest);
		});

		it("should success", async function() {
			const { accessToken, tokenType } = signUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const res = await postWarehouseReview(tokenType, accessToken, warehouse.id, postWarehouseReviewRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await postWarehouseReview("Bearer", "", warehouse.id, postWarehouseReviewRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
}