module.exports = (dependencies) => {
	const { mocha, chai, setupDatabase, db, apis, factories } = dependencies;
	const { describe, before, it } = mocha;
	const { expect } = chai;
	describe("patch warehouse", function() {
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
			const res = await apis.warehouses.patchWarehouse(signUpResponse, warehouse.id, { name: "patch name" });

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to unknown property", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouses.patchWarehouse(signUpResponse, warehouse.id, { unknown: "unknown	" });

			expect(res.status).to.equal(400);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid access token", async function() {
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouses.patchWarehouse({ body: { tokenType: "Bearer", accessToken: "" } }, warehouse.id, { name: "patch name" });

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to another users access token", async function() {
			const anotherUserSignUpResponse = await apis.auths.signUp(factories.users.newUser());
			const { warehouse } = postWarehouseResponse.body;
			const res = await apis.warehouses.patchWarehouse(anotherUserSignUpResponse, warehouse.id, { name: "patch name" });

			expect(res.status).to.equal(403);
			expect(res).to.satisfyApiSpec;
		});
	});
};