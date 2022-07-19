express = require("express");
const router = express.Router();

const {UpdateDescription} = require("../controller/usersController");

const {updatePoste} = require("../controller/usersController");

const {getAllUsers} = require("../controller/usersController");

const {signup} = require("../controller/usersController");

const {login} = require("../controller/usersController");

const {getOneUser} = require("../controller/usersController");

const {updatePasswordOfUser} = require("../controller/usersController");

const {deleteUser} = require("../controller/usersController");

const {updatePhotoProfil} = require("../controller/usersController");

//la page qui va afficher l'organigramme de l'entreprise
router.get("/organigrame", getAllUsers);

//login et inscription
router.post("/signup", signup);
router.post("/login", login);

//affichage de la page profil
router.get("/:id", getOneUser);

//changement du mot de passe du user
router.put("/:id", updatePasswordOfUser);

//changement de la photo de profil du user
router.put("/:id", updatePhotoProfil);

//mise à jour de la description
router.put("/:id/description", UpdateDescription);

//m'utilisateur a changé de poste
router.put("/:id/poste", updatePoste);

//suppression du compte utilisateur
router.delete("/:id", deleteUser);

module.exports = router;