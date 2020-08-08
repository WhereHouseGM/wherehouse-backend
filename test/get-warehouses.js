module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, getWarehouses, expect } = dependencies;
	describe("get warehouses", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("success", async function() {
			const res = await getWarehouses();

			expect(res.status).to.equal(200);
			expect(res).to.satisfyApiSpec;
		});
	});
};