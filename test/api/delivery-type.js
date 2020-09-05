module.exports = (chai, app) => {
	return {
		name: "deliveryTypes",
		async getDeliveryTypes(signInResponse) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.get("/v1/delivery-types")
				.set("Authorization", `${tokenType} ${accessToken}`);
		}
	};
};