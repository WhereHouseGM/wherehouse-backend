let agencyId = 0;
let generalId = 0;

module.exports = {
	name: "warehouses",
	newAgency() {
		agencyId++;
		return {
			"name": `name${agencyId}`,
			"serviceType": "AGENCY",
			"address": "ㅇㅇ도 ㅇㅇ시 ㅇㅇ구 ㅇㅇ동",
			"addressDetail": "ㅇㅇㅇ동 ㅇㅇㅇ호",
			"description": "이건 에이전시 창고입니다",
			"availableWeekdays": 63,
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
				"latitude": `${agencyId}`,
				"longitude": `${agencyId}`
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
	},
	newGeneral() {
		generalId++;
		return {
			"name": `name${generalId}`,
			"serviceType": "GENERAL",
			"address": "ㅇㅇ도 ㅇㅇ시 ㅇㅇ구 ㅇㅇ동",
			"addressDetail": "ㅇㅇㅇ동 ㅇㅇㅇ호",
			"description": "이건 일반 창고입니다",
			"availableWeekdays": 63,
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
				"latitude": `${generalId}`,
				"longitude": `${generalId}`
			},
			"additionalInfo": {
				"types": ["ROOM_TEMPERATURE"],
				"landArea": 100,
				"totalArea": 200,
				"monthlyFee": 300,
				"depositFee": 5000,
				"maintenanceFee": 10,
				"minUseTerm": 1
			}
		};
	}
};