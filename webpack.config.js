const path = require("path");
const fs = require("fs");

const nodeModules = {};
fs.readdirSync("node_modules")
	.filter(x => x !== ".bin")
	.forEach(mod => {
		nodeModules[mod] = "commonjs "+mod;
	});

module.exports = {
	mode: "production",
	entry: "./server.js",
	target: "node",
	output: {
		path: path.join(__dirname, "build"),
		filename: "server.js"
	},
	externals: nodeModules
}
