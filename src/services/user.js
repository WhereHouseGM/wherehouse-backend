const HTTPError = require("node-http-error");
const db = require("../models");

exports.getUser = async function (userIdFromToken, userIdParam) {
	const user = await db.users.findByPk(userIdParam);

	if(user === null) throw new HTTPError(404, "Not Found Error");
	if(userIdFromToken !== userIdParam) throw new HTTPError(403, "Forbidden Error");

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		type: user.type,
		telephoneNumber: user.telephoneNumber,
		phoneNumber: user.phoneNumber,
		companyName: user.companyName
	};
};

exports.patchUser = async function (userIdFromToken, userIdParam, patchUserRequest) {
	const user = await db.users.findByPk(userIdParam);

	if(user === null) throw new HTTPError(404, "Not Found Error");
	if(userIdFromToken !== userIdParam) throw new HTTPError(403, "Forbidden Error");


	// TODO 함수 분리하기
	user.name = patchUserRequest.name || user.name;
	user.email = patchUserRequest.email || user.email;
	user.password = patchUserRequest.password || user.password;
	user.type = patchUserRequest.type || user.type;
	user.phoneNumber = patchUserRequest.phoneNumber || user.phoneNumber;
	user.telephoneNumber = patchUserRequest.telephoneNumber || user.telephoneNumber;
	user.companyName = patchUserRequest.companyName || user.companyName;

	await user.save();

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		type: user.type,
		telephoneNumber: user.telephoneNumber,
		phoneNumber: user.phoneNumber,
		companyName: user.companyName
	};
};