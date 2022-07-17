express = require("express");
const router = express.Router();

const {getusers} = require("../controller/usersController");

const {signup} = require("../controller/usersController");

const {login} = require("../controller/usersController");

router.get("/", getusers);
router.post("/signup", signup);
router.post("/login", login)

module.exports = router;