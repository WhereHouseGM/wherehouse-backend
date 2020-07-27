const router = require("./router");

require("./auth/sign-up")(router);
require("./auth/sign-in")(router);

module.exports = router;