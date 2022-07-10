express = require("express");
const router = express.Router();

const {getusers} = require("../controller/users");

router.get("/", getusers)

module.exports = router;
// router.get("/", (req, res) => {
//     console.log("--> users link")
//     res.send("cela fonctionne");
// })