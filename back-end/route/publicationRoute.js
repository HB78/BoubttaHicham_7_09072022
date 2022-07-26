express = require("express");
const router = express.Router();

//authentification par token
// const auth = require("../middleware/auth");

const publication = require("../controller/publicationController");

router.get("/publication", publication.getAllPublication);

router.put("/publication", publication.updatePublication);

router.post("/publication", publication.createPublication);

router.delete("/publication", publication.deletePublication);

//on exporte tous les routers que l'on a coder ici
module.exports = router;