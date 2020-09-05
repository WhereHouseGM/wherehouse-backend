const db = require("../models");

exports.getDeliveryTypes = async function () {
	const deliveryTypes = await db.deliveryTypes.findAll();

	return deliveryTypes;
};
