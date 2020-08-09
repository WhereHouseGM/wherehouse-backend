module.exports = (dependencies) => {
	const { mocha, chai, setupDatabase, db, apis, factories } = dependencies;
	const { describe, before, it } = mocha;
	const { expect } = chai;
	describe("delete waerhouse review", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		const postWarehouseReviewRequest = factories.warehouseReviews.newReview();
		let signUpResponse, postWarehouseResponse, postWarehouseReviewResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await apis.auths.signUp(signUpRequest);
			postWarehouseResponse = await apis.warehouses.postWarehouse(signUpResponse, postWarehouseRequest);
			postWarehouseReviewResponse = await apis.warehouseReviews.postWarehouseReview(signUpResponse, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
		});

		it("should success", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const { review } = postWarehouseReviewResponse.body;
			const res = await apis.warehouseReviews.deleteWarehouseReview(signUpResponse, warehouse.id, review.id);

			expect(res.status).to.equal(204);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			postWarehouseReviewResponse = await apis.warehouseReviews.postWarehouseReview(signUpResponse, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
			const { warehouse } = postWarehouseResponse.body;
			const { review } = postWarehouseReviewResponse.body;
			const res = await apis.warehouseReviews.deleteWarehouseReview({ body: { tokenType: "Bearer", accessToken: "" } }, warehouse.id, review.id);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to another user access token", async function() {
			postWarehouseReviewResponse = await apis.warehouseReviews.postWarehouseReview(signUpResponse, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
			const anotherSignUpResponse = await apis.auths.signUp(factories.users.newUser());
			const { warehouse } = postWarehouseResponse.body;
			const { review } = postWarehouseReviewResponse.body;
			const res = await apis.warehouseReviews.deleteWarehouseReview(anotherSignUpResponse, warehouse.id, review.id);

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});
	});
}