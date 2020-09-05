const express = require("express");
const router = express.Router();

require("./auth/sign-up")(router);
require("./auth/sign-in")(router);
require("./auth/refresh-token")(router);

require("./user")(router);

require("./warehouse")(router);

require("./attachment")(router);

require("./warehouse-review")(router);

require("./delivery-type")(router);

module.exports = router;