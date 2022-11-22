express = require("express");
const router = express.Router();

//authentification par token
const auth = require("../middleware/auth");

const admin = require("../middleware/admin")

const {updateProfil} = require("../controller/usersController");

const {UpdateDescription, deleteUserByAdmin} = require("../controller/usersController");

const {updatePoste} = require("../controller/usersController");

const {getAllUsers} = require("../controller/usersController");

const {signup} = require("../controller/usersController");

const {login} = require("../controller/usersController");

const {getOneUser} = require("../controller/usersController");

const {updatePasswordOfUser} = require("../controller/usersController");

const {deleteUser} = require("../controller/usersController");

const {updatePhotoProfil} = require("../controller/usersController");

const {getLastPublicationOfUser} = require("../controller/usersController");

//check if is admin
const {checkIfAdmin} = require("../controller/usersController");

//importation de multer
const multer = require("../middleware/multer");

//la page qui va afficher l'organigramme de l'entreprise (ajouter le auth ?)
router.get("/organigramme", auth, getAllUsers); 

//login et inscription
router.post("/signup", signup);
router.post("/login", login);

//check if admin
router.get("/checkadmin/:id", auth, checkIfAdmin); 

//affichage de la page profil
router.get("/:id", auth, multer, getOneUser); 

//changement du mot de passe du user
router.put("/updateprofil/:id", auth, updateProfil);

//changement du mot de passe du user
router.put("/password/:id", auth, updatePasswordOfUser);

//changement de la photo de profil du user
router.put("/photo/:id", auth, multer, updatePhotoProfil);

//mise à jour de la description
router.put("/description/:id", auth, UpdateDescription);

//l'utilisateur a changé de poste
router.put("/poste/:id", auth, updatePoste);

//suppression du compte utilisateur
router.delete("/:id", auth, deleteUser);

//suppression du compte utilisateur PAR UN ADMIN
router.delete("/admin/:id", auth, admin, deleteUserByAdmin);

module.exports = router;