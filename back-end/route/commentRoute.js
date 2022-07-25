express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");

const commentaire = require("../controller/commentController");

router.get("/message", commentaire.getAllComment);

router.put("/message", commentaire.updateMessage);

router.post("/message", commentaire.createMessage);

router.get("/message", commentaire.deleteMessage);