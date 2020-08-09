module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;
	describe("get warehouse reviews", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		const postWarehouseReviewRequest = factories.warehouseReviews.newReview();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await apis.auths.signUp(signUpRequest);
			postWarehouseResponse = await apis.warehouses.postWarehouse(signUpResponse, postWarehouseRequest);
			await apis.warehouseReviews.postWarehouseReview(signUpResponse, postWarehouseResponse.body.warehouse.id, postWarehouseReviewRequest);
		});

		it("should success", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouseReviews.getWarehouseReviews(signUpResponse, warehouse.id);

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouseReviews.getWarehouseReviews({ body: { tokenType: "Bearer", accessToken: "" } }, warehouse.id);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};