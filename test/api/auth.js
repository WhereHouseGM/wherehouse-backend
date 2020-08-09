module.exports = (chai, app) => {
	return {
		name: "auths",
		async signIn(signInRequest) {
			return chai.request(app)
				.post("/v1/auth/sign-in")
				.send(signInRequest);
		},
		async signUp(signUpRequest) {
			return chai.request(app)
				.post("/v1/auth/sign-up")
				.send(signUpRequest);
		},
		async refreshToken(signInResponse) {
			const { tokenType, refreshToken } = signInResponse.body;
			return chai.request(app)
				.post("/v1/auth/refresh-token")
				.set("Authorization", `${tokenType} ${refreshToken}`);
		}
	};
};