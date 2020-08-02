module.exports = function (user) {
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