const { describe, before, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const db = require("../models");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

function buildUrl(query) {
	let url = "";

	if(query.address !== undefined)
		url += "address=${address}";
	if(query.minSize !== undefined)
		url += "&minSize=${minSize}";
	if(query.maxSize !== undefined)
		url += "&maxSize=${maxSize}";

	return url;
}

async function getWarehouses(query) {
	return chai.request(app)
		.get(buildUrl(query));
}

describe("get warehouses", function() {
	before(async function() {
		await db.sequelize.sync({ force: true });
	});

	it("success without any query param", async function() {
		const warehouses = await getWarehouses();
	});

	it("success address query param", async function() {
		const warehouses = await getWarehouses({
			address: "경기"
		});
	});

	it("success minSize, maxSize query param", async function() {
		const warehouses = await getWarehouses({
			minSize: 0,
			maxSize: 100
		});
	});
});