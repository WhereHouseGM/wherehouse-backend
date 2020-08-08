module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, postWarehouse, signUp, deleteWarehouseReview, postWarehouseReview, userFactory, warehouseFactory, warehouseReviewFactory, expect } = dependencies;
	describe("delete waerhouse review", function() {
		const signUpRequest = userFactory.newUser();
		const postWarehouseRequest =  warehouseFactory.newGeneral();
		const postWarehouseReviewRequest = warehouseReviewFactory.newReview();
		let signUpResponse, postWarehouseResponse, postWarehouseReviewResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			postWarehouseResponse = await postWarehouse(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseRequest);
			postWarehouseReviewResponse = await postWarehouseReview(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
		});

		it("should success", async function() {
			const { tokenType, accessToken } = signUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const { review } = postWarehouseReviewResponse.body;
			const res = await deleteWarehouseReview(tokenType, accessToken, warehouse.id, review.id);

			expect(res.status).to.equal(204);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			postWarehouseReviewResponse = await postWarehouseReview(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
			const { warehouse } = postWarehouseResponse.body;
			const { review } = postWarehouseReviewResponse.body;
			const res = await deleteWarehouseReview("Bearer", "", warehouse.id, review.id);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to another user access token", async function() {
			postWarehouseReviewResponse = await postWarehouseReview(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
			const anotherSignUpResponse = await signUp(userFactory.newUser());
			const { tokenType, accessToken } = anotherSignUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const { review } = postWarehouseReviewResponse.body;
			const res = await deleteWarehouseReview(tokenType, accessToken, warehouse.id, review.id);

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});
	});
}