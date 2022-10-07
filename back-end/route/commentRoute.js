express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");

const commentaire = require("../controller/commentController");

router.get("/message/:id", commentaire.getCommentByPublication);

router.put("/message/:id", auth, commentaire.updateMessage);

router.post("/message", auth, commentaire.createMessage);

router.delete("/message/:id", auth, commentaire.deleteMessage);

//on exporte tous les routers que l'on a coder ici
module.exports = router;