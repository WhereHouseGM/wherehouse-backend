const { getDeliveryTypes } = require("../../services/delivery-type");
const { authorize } = require("../../middlewares/auth");
const DeliveryTypeDto = require("../../dtos/delivery-type");

module.exports = (router) => {
	router.get("/delivery-types", authorize(), async function (req, res, next) {
		try {
			const deliveryTypes = await getDeliveryTypes();

			res.status(200).json({
				types: deliveryTypes.map(deliveryType => DeliveryTypeDto(deliveryType))
			});
		} catch (err) {
			next(err);
		}
	});
};