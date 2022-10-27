const db = require("../dataBase/db");

//on importe dotenv pour avoir les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//ici on importe bcrypt
const bcrypt = require("bcrypt");

//ici on importe le jwt
const jwt = require("jsonwebtoken");

//signup d'un utilisateur

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

exports.signup = async (req, res, next) => {
    console.log(req.body)
    try {
        //si le user ne rentre pas de mdp, de nom ou de mail
        if (!req.body.email || !req.body.password || !req.body.name) {
            res.status(400).send("bad request need email and password and name");
            return;
        }
        //si le user n'entre pas de mail valide ou de mdp valide
        if (!validateEmail(req.body.email) || req.body.password.length < 4 || req.body.password.length > 80) {
            res.status(400).send("L'email ou le mot de passe n'est pas correct");
            return;
        }
        const hash = bcrypt.hashSync(req.body.password, 10);

        //on va chercher toutes les infos du user ayant le mail entré
        //en fait la on veut verifier si le mail existe deja avant de faire un signup
        const verifEmailSql = `SELECT * FROM users WHERE email='${req.body.email}'; `;

        //on fait deux db.query : 
        //le 1er pour verifier si le mail est dans BDD
        //LE 2em pour faire le signup si le mail n'existe pas dans la BDD

        //on insere la data entrée par le user mais le mdp est remplacé par le hash
        const signupSQL = `INSERT INTO users (email, password, name) VALUES ('${req.body.email}', '${hash}', '${req.body.name}')`;

        //avec db.query on envoie la commande à la BDD
        let [rows, fields] = await db.query(verifEmailSql);

        //rows nous renvoi les données de la BDD cad un tabeau de ce qui a été enregistré
        console.log('--> rows', rows);

        //si il y a un email dans le tableau donc email existant
        //avec rows on interroge la BDD
        if (rows.length > 0) {
            res.status(401).json("L'email existe déjà");
            return;
        }
        await db.query(signupSQL);
        res.status(200).json("comtpe bien crée");
    } catch (error) {
        res.status(500).json(error);
    }
};


//Login d'un utilisateur
exports.login = async (req, res, next) => {
    try {
        //si l'utilisateur n'a pas entré de mdp ou de mail on gère l'erreur
        if (!req.body.password || !req.body.email) {
            res.status(400).json("veuillez entrez un mot de passe et un email")
        }

        //la commande est mise dans une constante
        //dans la constante on récupère tt les infos de la table users ayant le mail rentré par le user
        const emailSQL = `SELECT * FROM users WHERE email='${req.body.email}'`

        //on execute la commande avec db.query
        //on va recuperer dans le rows le resultat de emailSQL
        let [rows, fields] = await db.query(emailSQL)

        //dans le rows on a le resultat de la commande emailsql apres execution
        //autrement dit le mail, le mdp et le nom du user avec le mail rentré issus de la BDD
        console.log('rows:', rows)
        console.log('mot de pass hasher', rows[0].password)
        console.log('req.body.password', req.body.password)
        // Comparer le mot de pass hash et mdp rentré par le user req.body.password avec bcrypt (comparsync)
        // si c'est pas bon 401 sinon continuer le code générer JWT

        let passwordCompare = bcrypt.compareSync(req.body.password, rows[0].password)
        if (passwordCompare == false) {
            console.log("C'est pas le bon MDP")
            return res.status(401).json({ error: "mot de passe incorrect" })
        } 
        console.log("C'est le bon MDP")
        let jwtBody = {
            email: rows[0].email,
            id: rows[0].id,
            admin: rows[0].admin
        }
        const token = jwt.sign(jwtBody, process.env.KEY, { expiresIn: "77d" });
        const objResponse = {
            jwtBody: jwtBody,
            token: token,
        }
        console.log("--> info token", objResponse)
        return res.status(200).json({token: token, id:jwtBody.id, admin:jwtBody.admin});
    } catch (error) {
        res.status(500).json(error);
    }
};

//Récupération de tous les utilisateurs id nom le poste et la photo

exports.getAllUsers = async (req, res) => {
    try {
        let query = 'SELECT id, name, image_profil, poste FROM users';
        let [rows, fields] = await db.query(query);
        let id = rows[0].id;
        console.log(rows)
        res.status(200).json("utilisateurs affichés");
    } catch (e) {
        res.status(500).json(e);
    }
};

//Récupération d'un seul utilisateur pour la mise en place du profil

exports.getOneUser = async (req, res, next) => {
    try {
        let oneUser = `SELECT id, name, poste, image_profil, description FROM users WHERE id= '${req.params.id}'; `;
        let [rows, fields] = await db.query(oneUser);
        console.log('rows:', rows.length)
        if (rows.length == 0) {
            return res.status(401).json("utilisateurs introuvable");
        } else {
            return res.status(200).json(rows);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//mise à jour du mot de passe de l'utilisateur

exports.updatePasswordOfUser = async (req, res, next) => {
    try {
        let idOfUser = `SELECT id FROM users WHERE id= '${req.params.id}';`
        let [row, field] = await db.query(idOfUser);

        //pour ne pas qu'il modifie le mdp d'un compte inexistant
        if(!row.length > 0) {
            return res.status(400).json("l'utilisateur n'existe pas");
        }
        //si le compte existe on peut modifier son mot de passe
        const hash = bcrypt.hashSync(req.body.password, 10);
        let updatePassword = `UPDATE users SET password = '${hash}' WHERE id = '${req.params.id}';`;
        let [rows, fields] = await db.query(updatePassword);
        return res.status(201).json("mot de passe modifié");
    } catch (error) {
        res.status(500).json(error);
    }
};

//mise à jour de la photo de l'utilisateur

exports.updatePhotoProfil = async (req, res, next) => {
    try {
        console.log("photo de profil ajouter peut etre");
        let photoProfil = `UPDATE users SET image_profil = '${req.protocol}://${req.get('host')}/images/${req.file.filename}' WHERE users.id = '${req.params.id}';`;
        let [rows, fields] = await db.query(photoProfil);
        return res.status(201).json("photo de profil modifiée");
    } catch (error) {
        res.status(500).json(error);
    }
};

//mise à jour  de la description

exports.UpdateDescription = async (req, res, next) => {
    try {
        let descriptions = `UPDATE users SET description = '${req.body.description}' WHERE id = '${req.params.id}';`;
        let [rows, fields] = await db.query(descriptions);
        return res.status(200).json("modification de la description");
    } catch (error) {
        res.status(500).json(error);
    }
};

//mise à jour du poste de l'utilisateur

exports.updatePoste = async (req, res, next) => {
    try {
        let poste = `UPDATE users SET poste = '${req.body.poste}' WHERE users.id = '${req.params.id}';`;
        let [rows, fields] = await db.query(poste);
        return res.status(200).json("l'utilisateur a changer de poste");
    } catch (error) {
        res.status(500).json(error);
    }
};

//supression du compte de l'utilisateur

exports.deleteUser = async (req, res, next) => {
    try {
        let deleteCountOfUser = `DELETE FROM users WHERE id = '${req.params.id}'
        AND users.id = '${req.auth.id}';`;
        console.log('req.auth.id:', req.auth.id)
        let [rows, fields] = await db.query(deleteCountOfUser);

        //si le tableau rows contient quelque chose on supprime le compte
        if (rows.length > 0) {
            return res.status(200).json("le compte a été supprimé");
        } else {
            return res.status(404).json("l'utilisateur n'existe pas ou plus");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//recherche d'un utilisateur dans la barre de recherche

exports.searchUser = async (req, res) => {
    try {
        let search = `SELECT id, name, poste, image_profil FROM users WHERE name like "%" + ${req.query.name} + "%" ;`;
        let [rows, fields] = await db.query(deleteCountOfUser);

        if(!rows.length > 0) {
            res.status(404).json("utilisateur non trouvé parmis les employés");
            return
        }else {
            res.status(200).json("employé trouvé parmis les utilisateurs");
            return
        }
    } catch (error) {
        res.status(500).json(error);
    }
};