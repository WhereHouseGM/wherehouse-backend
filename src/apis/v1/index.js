const router = require("./router");

require("./auth/sign-up")(router);
require("./auth/sign-in")(router);
require("./auth/refresh-token")(router);

require("./user")(router);

require("./warehouse")(router);

module.exports = router;