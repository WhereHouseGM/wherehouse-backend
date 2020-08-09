let reviewId = 0;

module.exports = {
	name: "warehouseReviews",
	newReview() {
		return {
			rating: Math.ceil(Math.random()*5),
			content: `content ${reviewId}`
		};
	}
};