const { describe, before, it } = require("mocha");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const db = require("../src/models");
const app = require("../src/app");

chai.use(chaiHttp);
chai.should();

async function getWarehouse (tokenType, accessToken, warehouseId) {
	return chai.request(app)
		.get(`/v1/warehouses/${warehouseId}`)
		.set("Authorization", `${tokenType} ${accessToken}`);
}

describe("get warehouse", function () {
	before(async function () {
		await db.sequelize.sync({ force: true });
	});

	it("should success", async function () {
		// TODO: create warehouse
	});

	it("failed due to invalid access token", async function () {
		const res = await getWarehouse("Bearer", "", 1);

		expect(res.status).to.equal(401);
		expect(res.body).not.to.be.empty;
	});

	it("failed since warehouse not exist", async function () {
		const res = await getWarehouse("Bearer", "", 1);

		expect(res.status).to.equal(404);
		expect(res.body).not.to.be.empty;
	});
});