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
function validateName(name) {
    let regex = new RegExp("[a-zA-Z]")
    return regex.test(name);
}
function noNumber(name) {
    let regexNumber = new RegExp("[0-9a-zA-Z]")
    return regexNumber.test(name);
}

exports.signup = async (req, res, next) => {
    console.log(req.body)
    let bodyEmail = req.body.email
    let bodyName = req.body.name
    try {
        //si le user ne rentre pas de mdp, de nom ou de mail
        if (!req.body.email || !req.body.password || !req.body.name) {
            res.status(400).send("bad request need email and password and name");
            return;
        }
        //si le user n'entre pas de mail valide ou de mdp valide
        if (!validateEmail(req.body.email) || req.body.password.length < 4 || req.body.password.length > 80 || req.body.email.length > 70) {
            res.status(400).send("L'email ou le mot de passe n'est pas correct");
            return;
        }
        //si le user n'entre pas de nom valide
        if (!validateName(req.body.name)) {
            res.status(400).send("Il n'y pas de lettre dans votre nom");
            return;
        }
        // //si le user n'entre pas de nom valide
        // if (noNumber(req.body.name)) {
        //     res.status(400).send("Retirez les chiffres contenus dans le nom");
        //     return;
        // }
        //si le user n'entre pas de nom validen (longueur du nom)
        if (req.body.name.length > 25 || req.body.name.length < 2) {
            res.status(400).send("La taille du nom doit etre comprise entre 2 et 25 caractères");
            return;
        }
        const hash = bcrypt.hashSync(req.body.password, 10);

        //on va chercher toutes les infos du user ayant le mail entré
        //en fait la on veut verifier si le mail existe deja avant de faire un signup
        const verifEmailSql = `SELECT * FROM users WHERE email= ?; `;

        //on fait deux db.query : 
        //le 1er pour verifier si le mail est dans BDD
        //LE 2em pour faire le signup si le mail n'existe pas dans la BDD

        //on insere la data entrée par le user mais le mdp est remplacé par le hash
        const signupSQL = `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`;

        //avec db.query on envoie la commande à la BDD
        let [rows, fields] = await db.query(verifEmailSql, [bodyEmail]);

        //rows nous renvoi les données de la BDD cad un tabeau de ce qui a été enregistré
        console.log('--> rows', rows);

        //si il y a un email dans le tableau donc email existant
        //avec rows on interroge la BDD
        if (rows.length > 0) {
            res.status(401).json("L'email existe déjà");
            return;
        }
        await db.query(signupSQL, [bodyEmail, hash, bodyName]);
        res.status(200).json("comtpe bien crée");
    } catch (error) {
        res.status(500).json(error);
    }
};


//Login d'un utilisateur
exports.login = async (req, res, next) => {
    let bodyEmail = req.body.email
    try {
        //si l'utilisateur n'a pas entré de mdp ou de mail on gère l'erreur
        if (!req.body.password || !req.body.email) {
            res.status(400).json("veuillez entrez un mot de passe et un email")
        }

        //la commande est mise dans une constante
        //dans la constante on récupère tt les infos de la table users ayant le mail rentré par le user
        const emailSQL = `SELECT * FROM users WHERE email= ? `

        //on execute la commande avec db.query
        //on va recuperer dans le rows le resultat de emailSQL
        let [rows, fields] = await db.query(emailSQL, [bodyEmail])

        if(!rows.length > 0) {
            return res.status(402).json("Cet utilisateur n'existe pas, sinon vérifiez votre adresse mail")
        }

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
        const token = jwt.sign(jwtBody, process.env.KEY, { expiresIn: "1h" });
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
        let query = 'SELECT users.id, users.name, users.image_profil, users.poste FROM users';
        let [rows, fields] = await db.query(query);
        let id = rows[0].id;
        console.log(rows)
        res.status(200).json(rows);
    } catch (e) {
        res.status(500).json(e);
    }
};

//Récupération d'un seul utilisateur pour la mise en place du profil

exports.getOneUser = async (req, res, next) => {
    //inutile de rajouter la restriction liée à l'id du user dans le decoded token car je veux permettre à tous les utilisateurs de rechercher les autres utilisateur dans la page organigramme.
    const idParams = req.params.id
    try {
        let oneUser = `SELECT id, name, poste, image_profil, description FROM users WHERE id= ?; `;
        let [rows, fields] = await db.query(oneUser, [idParams]);
        console.log('rows:', rows.length)
        if (rows.length == 0) {
            return res.status(401).json("utilisateur introuvable");
        } else {
            return res.status(200).json(rows);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//mise à jour du mot de passe de l'utilisateur CORRECTION

// //update all profil 
// exports.updateProfil = async (req, res, next) => {
//     const idParams = req.params.id
//     const idToken = req.auth.id
//     let description = req.body.description
//     let job = req.body.poste
//     let photoProfil = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

//     try {
//         //on vérifie si au départ l'id contenu dans token est bien le meme que celui des params
//        let verifyIdUser = `SELECT users.id FROM users WHERE users.id = ?`
//        let [row, field] = await db.query(verifyIdUser, [idParams]);

//        //pour ne pas qu'il modifie le mdp d'un compte inexistant
//        if(!row.length > 0) {
//         return res.status(400).json("l'utilisateur n'existe pas");
//     }

//        if(row[0].id === idToken) {
//         const hash = bcrypt.hashSync(req.body.password, 10);
//         let updatePassword = `UPDATE users SET password = ?, image_profil = ?, description = ?, poste = ? WHERE id = ? AND users.id = ? ;`;

//         let [rows, fields] = await db.query(updatePassword, [hash, photoProfil, decription, poste, idParams, idToken]);

//         return res.status(200).json("profil mit à jour !");
//        }
//        return res.status(401).json("Vous n'etes pas autorisez à faire cette requete")
//     } catch (error) {
        
//     }
// }

exports.updatePasswordOfUser = async (req, res, next) => {
    const idParams = req.params.id
    const idToken = req.auth.id
    try {
        let idOfUser = `SELECT id FROM users WHERE id= ?;`
        let [row, field] = await db.query(idOfUser, [idParams]);

        //pour ne pas qu'il modifie le mdp d'un compte inexistant
        if(!row.length > 0) {
            return res.status(400).json("l'utilisateur n'existe pas");
        }
        //on vérifie si au départ l'id contenu dans token est bien le meme que celui des params
       let verifyIdUser = `SELECT users.id FROM users WHERE users.id = ?`
       let [roz, fiels] = await db.query(verifyIdUser, [idParams]);
       if(roz[0].id === idToken) {
           //si le compte existe on peut modifier son mot de passe
           const hash = bcrypt.hashSync(req.body.password, 10);
           let updatePassword = `UPDATE users SET password = ? WHERE id = ? AND users.id = ? ;`;
           let [rows, fields] = await db.query(updatePassword, [hash, idParams, idToken]);
           return res.status(201).json("mot de passe modifié !");
    }
    return res.status(401).json("Vous n'etes pas autorisez à faire cette requete")
    } catch (error) {
        return res.status(500).json(error);
    }
};

//mise à jour de la photo de l'utilisateur CORRECTION

exports.updatePhotoProfil = async (req, res, next) => {
    const idParams = req.params.id
    const idToken = req.auth.id
    try {
        //on vérifie si au départ l'id contenu dans token est bien le meme que celui des params
       let verifyIdUser = `SELECT users.id FROM users WHERE users.id = ?`
       let [row, field] = await db.query(verifyIdUser, [idParams]);
       if(row[0].id === idToken) {
           let photoProfil = `UPDATE users SET image_profil = '${req.protocol}://${req.get('host')}/images/${req.file.filename}' WHERE users.id = ? AND users.id = ? ;`;
           let [rows, fields] = await db.query(photoProfil, [idParams, idToken]);
           return res.status(201).json("photo de profil modifiée");
    }
    return res.status(401).json("Vous n'etes pas autorisez à faire cette requete")

    } catch (error) {
        res.status(500).json(error);
    }
};

//mise à jour  de la description CORRECTION

exports.UpdateDescription = async (req, res, next) => {
    const idParams = req.params.id
    let description = req.body.description
    const idToken = req.auth.id
    try {
        //on vérifie si au départ l'id contenu dans token est bien le meme que celui des params
       let verifyIdUser = `SELECT users.id FROM users WHERE users.id = ?`
       let [row, field] = await db.query(verifyIdUser, [idParams]);
       if(row[0].id === idToken) {
           let descriptions = `UPDATE users SET description = ? WHERE id = ? AND users.id = ?;`;
           let [rows, fields] = await db.query(descriptions, [description, idParams, idToken]);
           return res.status(200).json("modification de la description");
    }
        return res.status(401).json("Vous n'etes pas autorisez à faire cette requete")
    } catch (error) {
        res.status(500).json(error);
    }
};

//mise à jour du poste de l'utilisateur CORRECTION

exports.updatePoste = async (req, res, next) => {
    const idParams = req.params.id
    let job = req.body.poste
    const idToken = req.auth.id
    try {
       //on vérifie si au départ l'id contenu dans token est bien le meme que celui des params
       let verifyIdUser = `SELECT users.id FROM users WHERE users.id = ?`
       let [row, field] = await db.query(verifyIdUser, [idParams]);
       if(row[0].id === idToken) {
           let poste = `UPDATE users SET poste = ? WHERE users.id = ? AND users.id = ?;`;
           let [rows, fields] = await db.query(poste, [job, idParams, idToken]);
           return res.status(200).json("l'utilisateur a changer de poste");
    }
    return res.status(401).json("Vous n'etes pas autorisez à faire cette requete")

    } catch (error) {
        res.status(500).json(error);
    }
};

//supression du compte de l'utilisateur CORRECTION

exports.deleteUser = async (req, res, next) => {
    const idParams = req.params.id
    const idToken = req.auth.id
    try {
        //on vérifie si au départ l'id contenu dans token est bien le meme que celui des params
        let verifyIdUser = `SELECT users.id FROM users WHERE users.id = ?`
        let [row, field] = await db.query(verifyIdUser, [idParams]);
        if(row[0].id === idToken) {
            let deleteCountOfUser = `DELETE FROM users WHERE users.id = ?
            AND users.id = ? ;`;
            console.log('req.auth.id:', req.auth.id)
            let [rows, fields] = await db.query(deleteCountOfUser, [idParams, idToken]);
            return res.status(200).json("compte supprimé avec succes");
        }
        return res.status(401).json("Vous n'etes pas autorisez à faire cette requete")
    
        //si le tableau rows contient quelque chose on supprime le compte
        // if (rows.affectedRows === 0) {
        //     return res.status(200).json("l'utilisateur n'existe pas ou plus");
        // } 
    } catch (error) {
        res.status(500).json(error);
    }
};

//Check si le user est admin
exports.checkIfAdmin = async (req, res, next) => {
    const idParams = req.params.id
    const idToken = req.auth.id
    try {
        //on vérifie si au départ l'id contenu dans token est bien le meme que celui des params
        let verifyIsAdmin= `SELECT users.id, users.admin, users.name FROM users WHERE users.id = ? AND users.id = ? ;`
        let [rows, fields] = await db.query(verifyIsAdmin, [idParams, idToken]);
        console.log('rows:admin', rows)
        return res.status(200).json(rows);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ***********************************ADMIN*****************************************
exports.deleteUserByAdmin = async (req, res, next) => {
    const idParams = req.params.id
    try {
        let deleteCountOfUser = `DELETE FROM users WHERE id = ? ;`;
        let [rows, fields] = await db.query(deleteCountOfUser, [idParams]);

        //si le tableau rows contient quelque chose on supprime le compte
        // if (rows.affectedRows === 0) {
        //     return res.status(200).json("l'utilisateur n'existe pas ou plus");
        // } 
        return res.status(200).json("compte supprimé avec succes par un administrateur");
    } catch (error) {
        res.status(500).json(error);
    }
};