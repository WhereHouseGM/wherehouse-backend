const { describe, before, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const db = require("../models");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

async function getWarehouses() {
	return chai.request(app)
		.get("/v1/warehouses");
}

describe("get warehouses", function() {
	before(async function() {
		await db.sequelize.sync();
	});

	it("success", async function() {
		const res = await getWarehouses();

		expect(res).not.to.be.empty;
		expect(res.body).not.to.be.empty;
	});
});