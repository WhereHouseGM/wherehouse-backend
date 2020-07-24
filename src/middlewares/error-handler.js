const ValidationError  = require("sequelize").ValidationError;

module.exports = function(err, req, res, next) {
	if(err instanceof ValidationError) {
		if(err.parent.code === "ER_DUP_ENTRY") res.status(409).send({ message: "Conflict Error" });
	}

	res.status(500).send({ "message": "Internal Server Error" });
};