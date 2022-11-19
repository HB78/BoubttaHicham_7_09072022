express = require("express");
const router = express.Router();
const  multer = require('../middleware/multer');
// var upload = multer({ dest: 'images/' });
//authentification par token
const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const publication = require("../controller/publicationController");

router.get("/", auth, publication.getLastPublication); //rajouter le auth

//les publications d'un utilisateur
router.get("/:id", auth, publication.getLastPublicationOfUser); //rajouter le auth

router.post("/", auth, multer, publication.createPublication);
// router.post("/publication", upload.single('image'), publication.createPublication);

router.put("/:id", auth, multer, publication.updatePublication);

router.delete("/:id", auth, publication.deletePublication);

//***************************************ADMIN************************* */

router.delete("/admin/:id", auth, admin, publication.adminDeletePublication);

// router.put("/admin/:id", auth, admin, multer, publication.adminUpdatePublication);

//on exporte tous les routers que l'on a coder ici
module.exports = router;