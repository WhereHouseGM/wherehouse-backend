module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, getWarehouses, postWarehouse, signUp, factories, expect } = dependencies;
	describe("get warehouses", function() {
		const signUpRequest = factories.users.newUser();
		const postWarehouseRequest =  factories.warehouses.newGeneral();
		let signUpResponse, postWarehouseResponse;

		before(async function() {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			signUpResponse = signUpResponse.body;
			postWarehouseResponse = await postWarehouse(signUpResponse.tokenType, signUpResponse.accessToken, postWarehouseRequest);
			postWarehouseResponse = postWarehouseResponse.body;
		});

		it("success without query", async function() {
			const res = await getWarehouses();

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("success with address query", async function() {
			const res = await getWarehouses({ address: postWarehouse.address });

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("success with offset and limit query", async function() {
			const res = await getWarehouses({ offset: 0, limit: 2 });

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});

		it("failed due to invalid offset and limit values", async function() {
			const res = await getWarehouses({ offset: "null", limit: "null" });

			console.log(res.body);
			expect(res.status).to.equal(400);
			expect(res).to.satisfyApiSpec;
		});
	});
};