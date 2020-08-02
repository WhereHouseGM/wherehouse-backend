const HTTPError = require("node-http-error");
const db = require("../models");
const SimplifiedUserDto = require("../dtos/simplified-user");

exports.getUser = async function (userIdFromToken, userIdParam) {
	const user = await db.users.findByPk(userIdParam);

	if(user === null) throw new HTTPError(404, "Not Found Error");
	if(userIdFromToken !== userIdParam) throw new HTTPError(403, "Forbidden Error");

	return SimplifiedUserDto(user);
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

	return SimplifiedUserDto(user);
};