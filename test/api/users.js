module.exports = (chai, app) => {
	return {
		name: "users",
		async getUser(signInResponse, userId) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.get(`/v1/users/${userId}`)
				.set("Authorization", `${tokenType} ${accessToken}`);
		},
		async patchUser(signInResponse, userId, patchUserRequest) {
			const { tokenType, accessToken } = signInResponse.body;
			return chai.request(app)
				.patch(`/v1/users/${userId}`)
				.set("Authorization", `${tokenType} ${accessToken}`)
				.send(patchUserRequest);
		}
	};
};
