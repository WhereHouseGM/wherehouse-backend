let userId = 0;

module.exports = {
	name: "users",
	newUser() {
		userId++;
		return {
			name: `name${userId}`,
			email: `user${userId}@email.com`,
			password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
			type: "SHIPPER",
			telephoneNumber: `02-0000-000${userId}`,
			companyName: `company${userId}`,
			phoneNumber: `010-0000-000${userId}`
		};
	}
};