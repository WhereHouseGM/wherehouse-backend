const ValidationError  = require("sequelize").ValidationError;

module.exports = function(err, req, res, next) {
	if(err instanceof ValidationError) {
		if(err.parent.code === "ER_DUP_ENTRY") res.status(409).json({ message: "Conflict Error" });
	}

	res.status(500).json({ "message": "Internal Server Error" });
};