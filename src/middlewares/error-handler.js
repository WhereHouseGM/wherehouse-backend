const ValidationError  = require("sequelize").ValidationError;
const JsonWebTokenError = require("jsonwebtoken").JsonWebTokenError;

module.exports = function(err, req, res, next) {
	if(err instanceof ValidationError) {
		if(err.parent.code === "ER_DUP_ENTRY") res.status(409).json({ message: "Conflict Error" });
	}
	else if(err instanceof JsonWebTokenError) {
		res.status(401).json({ message: "Unauthorized Error" });
	}

	res.status(500).json({ "message": "Internal Server Error" });
};