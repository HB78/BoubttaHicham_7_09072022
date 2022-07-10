express = require("express");
const router = express.Router();

const {getusers} = require("../controller/users");

router.get("/", getusers)

module.exports = router;