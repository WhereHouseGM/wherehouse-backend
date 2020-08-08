module.exports = (dependencies) => {
	const { describe, before, it, setupDatabase, db, signUp, postWarehouse, expect } = dependencies;

	describe("post warehouse", function () {
		const signUpRequest = {
			name: "string1",
			email: "use21@exa2mple.com",
			password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
			type: "SHIPPER",
			telephoneNumber: "string",
			companyName: "string",
			phoneNumber: "string"
		};

		const postGeneralWarehouseRequest = {
			"name": "string",
			"serviceType": "AGENCY",
			"address": "경기 성남시 야탑동 장미로 55",
			"addressDetail": "108동 101호",
			"description": "string",
			"availableWeekdays": 0,
			"openAt": "08:00:00",
			"closeAt": "19:00:00",
			"availableTimeDetail": "금요일엔 1시간 일찍 닫음",
			"cctvExist": true,
			"securityCompanyExist": true,
			"securityCompanyName": "string",
			"doorLockExist": true,
			"airConditioningType": "HEATING",
			"workerExist": true,
			"insuranceExist": true,
			"insuranceName": "string",
			"canPickup": true,
			"canPark": true,
			"attachmentIds": [
				0
			],
			"location": {
				"latitude": 0,
				"longitude": 0
			},
			"additionalInfo": {
				"type": "3PL",
				"mainItemType": "CLOTH",
				"storageType": "BOX",
				"payments": [
					{
						"unit": "string",
						"cost": 0,
						"description": "string",
						"type": "STORE"
					},
					{
						"unit": "다스",
						"cost": 1000,
						"description": "연필 보관",
						"type": "STORE"
					},
					{
						"unit": "KG",
						"cost": 100,
						"description": "물건 옮기기",
						"type": "WORK"
					}
				]
			}
		};

		const postAgencyWarehouseRequest = {
			"name": "string",
			"serviceType": "GENERAL",
			"address": "경기 성남시 야탑동 장미로 55",
			"addressDetail": "108동 101호",
			"description": "string",
			"availableWeekdays": 0,
			"openAt": "08:00:00",
			"closeAt": "19:00:00",
			"availableTimeDetail": "금요일엔 1시간 일찍 닫음",
			"cctvExist": true,
			"securityCompanyExist": true,
			"securityCompanyName": "string",
			"doorLockExist": true,
			"airConditioningType": "HEATING",
			"workerExist": true,
			"insuranceExist": true,
			"insuranceName": "string",
			"canPickup": true,
			"canPark": true,
			"attachmentIds": [
				0
			],
			"location": {
				"latitude": 0,
				"longitude": 0
			},
			"additionalInfo": {
				"type": "ROOM_TEMPERATURE",
				"size": 100,
				"monthlyFee": 300,
				"depositFee": 5000,
				"maintenanceFee": 10,
				"minUseTerm": 1
			}
		};

		let signUpResponse;

		before(async function () {
			await setupDatabase(db);
			signUpResponse = await signUp(signUpRequest);
			signUpResponse = signUpResponse.body;
		});

		it("should success(general warehouse)", async function () {
			const { tokenType, accessToken } = signUpResponse;
			const res = await postWarehouse(tokenType, accessToken, postGeneralWarehouseRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should success(agency warehouse)", async function () {
			const { tokenType, accessToken } = signUpResponse;
			const res = await postWarehouse(tokenType, accessToken, postAgencyWarehouseRequest);

			expect(res.status).to.equal(201);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to invalid token", async function () {
			const res = await postWarehouse("Bearer", "", postAgencyWarehouseRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});

		it("should fail due to invalid token", async function () {
			const res = await postWarehouse("Bearer", "", postAgencyWarehouseRequest);

			expect(res.status).to.equal(401);
			expect(res).to.satisfyApiSpec;
		});
	});
};