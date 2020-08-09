module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, postWarehouse, signUp, getWarehouseReviews, postWarehouseReview, factories, expect } = dependencies;
	describe("get warehouse reviews", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		const postWarehouseReviewRequest = factories.warehouseReviews.newReview();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			postWarehouseResponse = await postWarehouse(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseRequest);
			await postWarehouseReview(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
		});

		it("should success", async function() {
			const { tokenType, accessToken } = signUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const res = await getWarehouseReviews(tokenType, accessToken, warehouse.id);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await getWarehouseReviews("Bearer", "", warehouse.id);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};