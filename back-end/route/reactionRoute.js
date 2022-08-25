express = require("express");
const router = express.Router();

const reaction = require("../controller/reactionController");

//obtenir les likes des publications
router.get("/like", reaction.getLikeOfPublication);

//obtenir les publications avec aucun like ni dislike
router.get("/like", reaction.getNoLikeOfPublication);

//obtenir les likes des publications
router.get("/like", reaction.getDislikeOfPublication);

//ajouter un like
router.put("/like", reaction.addLike);

//ajouter un dislike
router.put("/like", reaction.removeLike);

// ne plus réagir à la publication
router.put("/like", reaction.cancelLike);

//on exporte tous les routers que l'on a coder ici
module.exports = router;