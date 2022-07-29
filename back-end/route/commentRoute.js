express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");

const commentaire = require("../controller/commentController");

router.get("/message", commentaire.getCommentByPublication);

router.put("/message", commentaire.updateMessage);

router.post("/message", commentaire.createMessage);

router.delete("/message", commentaire.deleteMessage);

//on exporte tous les routers que l'on a coder ici
module.exports = router;