module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, apis, factories, expect } = dependencies;
	describe("get warehouses", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await apis.auths.signUp(signUpRequest);
			postWarehouseResponse = await apis.warehouses.postWarehouse(signUpResponse, postWarehouseRequest);
		});

		it("success without query", async function() {
			const res = await apis.warehouses.getWarehouses();

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("success with address query", async function() {
			const res = await apis.warehouses.getWarehouses({ address: postWarehouseResponse.body.address });

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("success with offset and limit query", async function() {
			const res = await apis.warehouses.getWarehouses({ offset: 0, limit: 2 });

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid offset and limit values", async function() {
			const res = await apis.warehouses.getWarehouses({ offset: "null", limit: "null" });

			console.log(res.body);
			expect(res.status).to.equal(400);
			expect(res).to.satisfyApiSpec;
		});
	});
};