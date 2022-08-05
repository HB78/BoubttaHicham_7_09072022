express = require("express");
const router = express.Router();
// var multer = require('multer');
// var upload = multer({ dest: 'images/' });
//authentification par token
const auth = require("../middleware/auth");

const publication = require("../controller/publicationController");

router.get("/", publication.getLastPublication);

router.post("/", publication.createPublication);
// router.post("/publication", upload.single('image'), publication.createPublication);

router.put("/:id", publication.updatePublication);

// DELETE http://localhost:3000/publication/5
  /**
   * {
   *  jwt: dfsfdsfds.fds1585ds.edfsdf
   * }
   */
router.delete("/:id", auth, publication.deletePublication);

//on exporte tous les routers que l'on a coder ici
module.exports = router;