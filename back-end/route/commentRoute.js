express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const commentaire = require("../controller/commentController");

router.get("/message/:id", auth, commentaire.getCommentByPublication);

router.put("/message/:id", auth, commentaire.updateMessage);

router.post("/message", auth, commentaire.createMessage);

router.delete("/message/:id", auth, commentaire.deleteMessage);

/******************************ADMIN***********************************/

router.delete("/admin/message/:id", auth, admin, commentaire.adminDeleteMessage);

// router.put("/admin/message/:id", auth, admin, commentaire.adminUpdateMessage);

//on exporte tous les routers que l'on a coder ici
module.exports = router;