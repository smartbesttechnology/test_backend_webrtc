const { userSignupController } = require("./controller");

const router = require("express").Router();

router.get("/signup", (req, res) => {
    res.send('hello man')
});

module.exports = router