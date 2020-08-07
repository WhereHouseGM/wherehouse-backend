const Joi = require("joi");
const { postWarehouseReview } = require("../../services/warehouse-review");
const { authorize } = require("../../middlewares/auth");
const WarehouseReviewDto = require("../../dtos/warehouse-review");

const postWarehouseReviewRequestValidator = Joi.object({
	rating: Joi.number().integer().required(),
	content: Joi.string().max(200)
});

module.exports = (router) => {
	router.post("/warehouses/:warehouseId/reviews", authorize(), async function (req, res ,next) {
		try {
			const userId = res.locals.userId;
			const warehouseId = req.params.warehouseId;
			const { value, error } = postWarehouseReviewRequestValidator.validate(req.body);
			if(error) throw error;

			const review = await postWarehouseReview(userId, warehouseId, value);

			res.status(201).send(WarehouseReviewDto(review));
		} catch (err) {
			next(err);
		}
	});
};