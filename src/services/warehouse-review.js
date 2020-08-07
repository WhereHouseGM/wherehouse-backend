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