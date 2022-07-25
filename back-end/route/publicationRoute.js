express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");

const publication = require("../controller/publicationController");

router.get("/publication", publication.createPublication);

router.put("/publication", publication.updatePublication);

router.post("/publication", publication.createPublication);

router.deletePublication("/publication", publication.deletePublication);