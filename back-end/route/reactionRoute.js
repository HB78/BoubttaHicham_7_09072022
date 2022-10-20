express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");

const reaction = require("../controller/reactionController");

//obtenir les likes des publications
router.get("/like/:id", reaction.getLikeOfPublication);

//obtenir les publications avec aucun like ni dislike
router.get("/like", reaction.getNoLikeOfPublication);

//obtenir les likes des publications
router.get("/dislike/:id", reaction.getDislikeOfPublication);

//ajouter un like
router.put("/like/:id", auth, reaction.addLike);

//ajouter un dislike
router.put("/dislike/:id", auth, reaction.removeLike);

// ne plus réagir à la publication
router.put("/cancel/:id", auth, reaction.cancelLike);

// une route pour savoir si l'utilisateur à liker une certaine publication
router.get("/like/:id/userLiked", auth, reaction.hasUserLikedPublication);

// une route pour savoir si l'utilisateur à disliker une certaine publication
router.get("/dislike/:id/userDisliked", auth, reaction.hasUserDislikedPublication);

//on exporte tous les routers que l'on a coder ici
module.exports = router;