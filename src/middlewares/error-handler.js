const SequelizeValidationError  = require("sequelize").ValidationError;
const JoiValidationError  = require("joi").ValidationError;
const JsonWebTokenError = require("jsonwebtoken").JsonWebTokenError;
const HTTPError = require("node-http-error");

module.exports = function(err, req, res, next) {
	if(err instanceof SequelizeValidationError) {
		if(err.parent && err.parent.code === "ER_DUP_ENTRY") res.status(409).json({ message: "Conflict Error" });
		else res.status(400).json({ message: err.message });
	}
	else if(err instanceof JoiValidationError) {
		res.status(400).json({ message: err.message });
	}
	else if(err instanceof JsonWebTokenError) {
		res.status(401).json({ message: "Unauthorized Error" });
	}
	else if(err instanceof HTTPError) {
		res.status(err.status).json({ message: err.message });
	}

	res.status(500).json({ message: err.message });
};