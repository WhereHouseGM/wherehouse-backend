exports.setupDatabase = async function (db) {
	await db.sequelize.sync();

	const models = Object.keys(db.sequelize.models).map(key => db.sequelize.models[key]);
	await Promise.all(models.map(async model => await model.destroy({ where: {} })));
};