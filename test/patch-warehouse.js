module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, patchWarehouse, postWarehouse, signUp, userFactory, warehouseFactory, expect } = dependencies;
	describe("patch warehouse", function() {
		const signUpRequest = userFactory.newUser();
		const postWarehouseRequest =  warehouseFactory.newGeneral();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			postWarehouseResponse = await postWarehouse(signUpResponse.body.tokenType, signUpResponse.body.accessToken, postWarehouseRequest);
		});

		it("should success", async function() {
			console.log(postWarehouseResponse);
			const { tokenType, accessToken } = signUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const res = await patchWarehouse(tokenType, accessToken, warehouse.id, { name: "patch name" });

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to unknown property", async function() {
			const { tokenType, accessToken } = signUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const res = await patchWarehouse(tokenType, accessToken, warehouse.id, { unknown: "unknown	" });

			expect(res.status).to.equal(400);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await patchWarehouse("Bearer", "", warehouse.id, { name: "patch name" });

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to another users access token", async function() {
			const anotherUserSignUpResponse = await signUp(userFactory.newUser());
			const { tokenType, accessToken } = anotherUserSignUpResponse.body;
			const { warehouse } = postWarehouseResponse.body;
			const res = await patchWarehouse(tokenType, accessToken, warehouse.id, { name: "patch name" });

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});
	});
};