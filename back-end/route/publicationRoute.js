express = require("express");
const router = express.Router();
const  multer = require('../middleware/multer');
// var upload = multer({ dest: 'images/' });
//authentification par token
const auth = require("../middleware/auth");

const publication = require("../controller/publicationController");

router.get("/", publication.getLastPublication); //rajouter le auth

//les publications d'un utilisateur
router.get("/:id", publication.getLastPublicationOfUser); //rajouter le auth

router.post("/", auth, multer, publication.createPublication);
// router.post("/publication", upload.single('image'), publication.createPublication);

router.put("/:id", auth, multer, publication.updatePublication);

// DELETE http://localhost:3000/publication/5
  /**
   * {
   *  jwt: dfsfdsfds.fds1585ds.edfsdf
   * }
   */
router.delete("/:id", auth, publication.deletePublication);

//on exporte tous les routers que l'on a coder ici
module.exports = router;