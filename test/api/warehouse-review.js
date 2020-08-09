module.exports = (chai, app) => {
	return {
		name: "warehouseReviews",
		async getWarehouseReviews(signInResponse, warehouseId) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.get(`/v1/warehouses/${warehouseId}/reviews`)
				.set("Authorization", `${tokenType} ${accessToken}`);
		},
		async postWarehouseReview(signInResponse, warehouseId, postWarehouseReviewRequest) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.post(`/v1/warehouses/${warehouseId}/reviews`)
				.set("Authorization", `${tokenType} ${accessToken}`)
				.send(postWarehouseReviewRequest);
		},
		async deleteWarehouseReview(signInResponse, warehouseId, warehouseReviewId) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.delete(`/v1/warehouses/${warehouseId}/reviews/${warehouseReviewId}`)
				.set("Authorization", `${tokenType} ${accessToken}`);
		}
	};
};