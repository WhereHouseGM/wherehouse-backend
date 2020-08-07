const db = require("../models");
const { getWarehouse } = require("./warehouse");

exports.postWarehouseReview = async function (userId, warehouseId, postWarehouseReviewRequest) {
	const warehouse = await getWarehouse(warehouseId);

	const _review = await db.warehouseReviews.create({
		...postWarehouseReviewRequest,
		writerId: userId,
		warehouseId: warehouse.id
	});

	const review = await db.warehouseReviews.findOne({
		where: { id: _review.id },
		include: [{ model: db.users, as: "writer" }]
	});

	return review;
};

exports.getWarehouseReviews = async function (userId, warehouseId, getWarehouseReviewQuery) {
	await getWarehouse(warehouseId);

	const queryOption = {
		where: { warehouseId: warehouseId},
		include: [{ model: db.users, as: "writer" }]
	};
	if(getWarehouseReviewQuery.limit !== undefined) queryOption.limit = getWarehouseReviewQuery.limit;
	if(getWarehouseReviewQuery.offset !== undefined) queryOption.offset = getWarehouseReviewQuery.offset;

	console.log(queryOption);
	const reviews = await db.warehouseReviews.findAll(queryOption);

	return reviews;
};