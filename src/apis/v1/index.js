const router = require("./router");

require("./auth/sign-up")(router);
require("./auth/sign-in")(router);
require("./auth/refresh-token")(router);

module.exports = router;