const { userSignupController } = require("./controller");

const router = require("express").Router();

router.post("/signup", userSignupController);

module.exports = router