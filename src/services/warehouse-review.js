const db = require("../models");
const { getWarehouse } = require("./warehouse");
const HTTPError = require("node-http-error");

exports.postWarehouseReview = async function (userId, warehouseId, postWarehouseReviewRequest) {
	const warehouse = await getWarehouse(warehouseId);

	const _review = await db.warehouseReviews.create({
		...postWarehouseReviewRequest,
		writerId: userId,
		warehouseId: warehouse.id
	});

	const review = await getWarehouseReview(_review.id);

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

async function getWarehouseReview (reviewId) {
	const review = await db.warehouseReviews.findOne({
		where: { id: reviewId },
		include: [{ model: db.users, as: "writer" }]
	});

	return review;
}

exports.deleteWarehouseReview = async function (userId, warehouseId, reviewId) {
	await getWarehouse(warehouseId);
	const review = await getWarehouseReview(reviewId);

	if(review.writer.id !== userId) throw new HTTPError(403, "Only writer can delete review");

	await review.destroy();
};