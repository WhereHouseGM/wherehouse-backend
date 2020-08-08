module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, getWarehouses, expect } = dependencies;
	describe("get warehouses", function() {
		before(async function() {
			await setupDatabase(db);
		});

		it("success", async function() {
			const res = await getWarehouses();

			expect(res).not.to.be.empty;
			expect(res.body).not.to.be.empty;
		});
	});
};