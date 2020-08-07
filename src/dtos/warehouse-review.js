const SimplifiedUserDto = require("./simplified-user");

module.exports = (review) => {
	return {
		id: review.id,
		rating: review.rating,
		content: review.content,
		writer: SimplifiedUserDto(review.writer)
	};
};