exports.setupDatabase = async function (db) {
	await db.sequelize.transaction(async t => {
		await db.sequelize.query("SET FOREIGN_KEY_CHECKS=0", { transaction: t });
		await db.sequelize.sync({ transaction: t});

		const models = Object.keys(db.sequelize.models).map(key => db.sequelize.models[key]);
		await Promise.all(models.map(async model => await model.truncate({ transaction: t })));
	});
};
