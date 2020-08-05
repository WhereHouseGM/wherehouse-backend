const authConfig = require("../config/auth");
const db = require("../models");
const sha256 = require("js-sha256");
const { generateTokenResponse } = require("../services/token");
const HTTPError = require("node-http-error");

exports.refreshToken = async function (userId) {
	const user = await db.users.findByPk(userId);
	return generateTokenResponse(user, authConfig);
};

exports.signIn = async function (signInRequest) {
	// save request data
	const hashedPassword = sha256(signInRequest.password);

	const user = await db.users.findOne({
		where: {
			email: signInRequest.email,
			password: hashedPassword
		}
	});

	if(user === null) throw new HTTPError(404, "User not found");
	// return jwt response
	return generateTokenResponse(user, authConfig);
};

exports.signUp = async function (signUpRequest) {
	// save request data
	const hashedPassword = sha256(signUpRequest.password);

	const newUser = await db.users.create({
		password: hashedPassword,
		name: signUpRequest.name,
		email: signUpRequest.email,
		type: signUpRequest.type,
		telephoneNumber: signUpRequest.telephoneNumber,
		companyName: signUpRequest.companyName,
		phoneNumber: signUpRequest.phoneNumber
	});

	// return jwt response
	return generateTokenResponse(newUser, authConfig);
};