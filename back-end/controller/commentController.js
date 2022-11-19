//afficher les commentaires

//faut il faire les choses en deux parties ?
//on joint la table like et publication dans publicationCTRL.js ??
//on joint la table publication et message dans commentCTRL.js ??

//importation de la base de donnée
const db = require("../dataBase/db");

//importation de moment
var moment = require('moment'); // require

//afficher tous les commentaires
exports.getCommentByPublication = async (req, res) => {
    try {
        //si le commentaire n'est lié à aucune publication
        //ou l'id de la publication n'est pas un nombre
        // if (!req.body.id_publi || typeof req.body.id_publi !== 'number' )  {
        //     res.status(400).json("Requète mal formaté ajoutez id_publi");
        // }
        //ici on gère la pagination, on veut qu'il nous affiche les 10 premiers commentaires
        //on ne peut pas lui dire de tous nous donner car il peut y avoir des miliers de commentaires
        let START = req.body.start || 0;
        let NB_COMMENT = 10;
        const idParams = req.params.id
        console.log("--> req.params controller", req.params)
        //on veut afficher tous les commentaires des publications
        let allcomment = `SELECT commentaire.id, commentaire.id_publi, contenu, date_comment, users.image_profil, users.name, commentaire.id_user FROM commentaire 
        INNER JOIN users ON 
        commentaire.id_user = users.id 
        WHERE commentaire.id_publi =  ?
        ORDER BY commentaire.date_comment DESC LIMIT  0, 10;`
        let [rows, fields] = await db.query(allcomment, [idParams]);
        // console.log("--> les messages affiché", rows);
        //quand on met /:id dans une route comme parametre, on met id après req.params ou req.body
        return res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};

// // A l'aide dd'un tab d'id de publication obtenire un tableau de tabeau de commentaire (limit 10)
// exports.getCommentByPublications = async (req,res) => {
//     try {
//         let err = false;
//         if (!req.body.tab_id_publi || Array.isArray(req.body.tab_id_publi))  {
//             res.status(400).json("Requète mal formaté ajoutez id_publi");
//         }
//         req.body.tab_id_publi.map(id =>{
//             if (typeof id != 'number') {
//                 err = true;
//             }
//         });
//         if (err) {
//             res.status(400).json("Requète mal formaté ajoutez tab_id_publi not number");
//             return;
//         }
//         // requette bien formater
//         let tab_comments = []
//         req.body.tab_id_publi.forEach(async (id_pub) =>{
//             let allcomment = `SELECT commentaire.id, contenu, date_comment, users.name, commentaire.id_user FROM commentaire 
//             INNER JOIN users ON 
//             commentaire.id_user = users.id 
//             WHERE commentaire.id_publi =  ${id_pub}
//             ORDER BY commentaire.date_comment DESC LIMIT  0, 2;`
//             let [rows, fields] = await db.query(allcomment);
//             tab_comments.push({rows, id_pub});
//         });
//         return res.status(200).json(tab_comments);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

//créer un commentaire
exports.createMessage = async (req, res) => {
    const idParams = req.params.id
    let contenu = req.body.contenu
    const idToken = req.auth.id
    let idPubli = req.body.id_publi
    try {
        let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        let createComment = `INSERT INTO commentaire (contenu, date_comment, id_user, id_publi) VALUES ( ?, ?, ?, ?);`;
        let [rows, fields] = await db.query(createComment, [contenu, now, idToken, idPubli]);
        console.log("--> le message a été créee", rows);
        return res.status(200).json("--> le message a été créee");
    } catch (error) {
        res.status(500).json(error);
    }
};

//effacer un commentaire CORRECTION
exports.deleteMessage = async (req, res) => {
    const idParams = req.params.id
    const idToken = req.auth.id
    try {
        //je met en correspondance le commentaire.id = ? AND commentaire.id_user = ? afin de vérifer l'identité du user
        let deleteComment = `DELETE FROM commentaire 
            WHERE commentaire.id = ? AND commentaire.id_user = ?;`;
        let [rows, fields] = await db.query(deleteComment, [idParams, idToken]);
        return res.status(200).json({ info: rows.affectedRows + " message supprimé" });
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: error });
    }
};

//mettre à jour un commentaire CORRECTION
exports.updateMessage = async (req, res) => {
    const idParams = req.params.id
    let contenu = req.body.contenu
    const idToken = req.auth.id
    let idPubli = req.body.id_publi
    try {
        //je met en correspondance le commentaire.id = ? AND commentaire.id_user = ? afin de vérifer l'identité du user
        let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        let updateComment = `UPDATE commentaire SET contenu = ?, date_comment = ?
            WHERE commentaire.id = ? AND commentaire.id_user = ?;`;
        let [rows, fields] = await db.query(updateComment, [contenu, now, idParams, idToken]);
        console.log('rows: --> message modifié', rows)
        return res.status(200).json("message mis a jour");

    } catch (error) {
        res.status(500).json(error);
    }
}

//******************************ADMIN*************************************** */

//effacer un commentaire en tant que admin
exports.adminDeleteMessage = async (req, res) => {
    const idParams = req.params.id
    try {
        if (req.auth.isAdmin == 1) {
            let deleteComment = `DELETE FROM commentaire 
            WHERE commentaire.id = ?`;
            let [rows, fields] = await db.query(deleteComment, [idParams]);
            return res.status(200).json({ info: rows.affectedRows + " message supprimé" });
        }
        return res.status(401).json("vous n'etes pas un admin !!!!")
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: error });
    }
};

// //mettre à jour un commentaire en tant qu'admin
// exports.adminUpdateMessage = async (req, res) => {
//     const idParams = req.params.id
//     let contenu = req.body.contenu
//     const idToken = req.body.decodedToken.id
//     let idPubli = req.body.id_publi
//     try {
//         let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
//         let updateComment= `UPDATE commentaire SET contenu = ?, date_comment = ?
//         WHERE commentaire.id = ? AND commentaire.id_user = ?;`;
//         let [rows, fields] = await db.query(updateComment, [contenu, now, idParams, idToken]);
//         console.log('rows: --> message modifié', rows)
//         res.status(200).json("message mis a jour");
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }