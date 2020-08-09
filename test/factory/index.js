const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const factories = {};

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
	})
	.forEach(file => {
		const factory = require(path.join(__dirname, file));
		factories[factory.name] = factory;
	});

module.exports = factories;