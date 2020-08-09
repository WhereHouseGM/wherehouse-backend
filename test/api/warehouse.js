const qs = require("qs");

module.exports = (chai, app) => {
	return {
		name: "warehouses",
		async getWarehouses(query) {
			const queryString = qs.stringify(query);
			return chai.request(app)
				.get(`/v1/warehouses?${queryString}`);
		},
		async getWarehouse (signInResponse, warehouseId) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.get(`/v1/warehouses/${warehouseId}`)
				.set("Authorization", `${tokenType} ${accessToken}`);
		},
		async postWarehouse(signInResponse, postWarehouseRequest) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.post("/v1/warehouses")
				.set("Authorization", `${tokenType} ${accessToken}`)
				.send(postWarehouseRequest);
		},
		async patchWarehouse (signInResponse, warehouseId, patchWarehouseRequest) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.patch(`/v1/warehouses/${warehouseId}`)
				.set("Authorization", `${tokenType} ${accessToken}`)
				.send(patchWarehouseRequest);
		},
		async deleteWarehouse (signInResponse, warehouseId) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.delete(`/v1/warehouses/${warehouseId}`)
				.set("Authorization", `${tokenType} ${accessToken}`);
		}
	};
};