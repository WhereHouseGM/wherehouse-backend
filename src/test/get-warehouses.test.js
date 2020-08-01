const { describe, before, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const db = require("../models");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

function buildUrl(address, minSize, maxSize) {
	if()
}
async function getWarehouses(address, minSize, maxSize) {
	return chai.request(app)
		.get("/v1/warehouses");
}

describe("get warehouses", function() {
	before(async function() {
		await db.sequelize.sync();
	});

	it("success without any query param", async function() {

	});

	it("success address query param", async function() {

	});

	it("success minSize, maxSize query param", async function() {

	});
});