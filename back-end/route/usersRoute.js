express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");

const {UpdateDescription} = require("../controller/usersController");

const {updatePoste} = require("../controller/usersController");

const {getAllUsers} = require("../controller/usersController");

const {signup} = require("../controller/usersController");

const {login} = require("../controller/usersController");

const {getOneUser} = require("../controller/usersController");

const {updatePasswordOfUser} = require("../controller/usersController");

const {deleteUser} = require("../controller/usersController");

const {updatePhotoProfil} = require("../controller/usersController");

const {searchUser} = require("../controller/usersController");

const {getAllPublicationOfUser} = require("../controller/usersController");

//importation de multer
const multer = require("../middleware/multer");

//TODO: il faut revoir tous les endpoints des routes

//la page qui va afficher l'organigramme de l'entreprise
router.get("/organigrame", auth, getAllUsers);

//recherche d'un utilisateur dans la barre de recherche
router.get("/search", searchUser);

//login et inscription
router.post("/signup", signup);
router.post("/login", login);

//affichage de la page profil
router.get("/:id", multer, getOneUser);

//changement du mot de passe du user
router.put("/:id", updatePasswordOfUser);

//changement de la photo de profil du user
router.put("/:id/photo", multer, updatePhotoProfil);

//mise à jour de la description
router.put("/:id/description", UpdateDescription);

//l'utilisateur a changé de poste
router.put("/:id/poste", updatePoste);

//afficher toutes les publications du user dans son profil
router.get("/profil", getAllPublicationOfUser);

//suppression du compte utilisateur
router.delete("/:id", deleteUser);

module.exports = router;