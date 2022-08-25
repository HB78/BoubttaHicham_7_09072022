//afficher les commentaires

//faut il faire les choses en deux parties ?
//on joint la table like et publication dans publicationCTRL.js ??
//on joint la table publication et message dans commentCTRL.js ??

//importation de la base de donnée
const db = require("../dataBase/db");

//importation de moment
var moment = require('moment'); // require

//afficher tous les commentaires
exports.getCommentByPublication = async (req,res) => {
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
        //on veut afficher tous les commentaires des publications
        let allcomment = `SELECT commentaire.id, commentaire.id_publi, contenu, date_comment, users.name FROM commentaire 
        INNER JOIN users ON 
        commentaire.id_user = users.id 
        WHERE commentaire.id_publi =  ${req.body.id_publi}
        ORDER BY commentaire.date_comment DESC LIMIT  0, 10;`
        let [rows, fields] = await db.query(allcomment);
        // console.log("--> les messages affiché", rows);
        return res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};

// A l'aide dd'un tab d'id de publication obtenire un tableau de tabeau de commentaire (limit 10)
exports.getCommentByPublications = async (req,res) => {
    try {
        let err = false;
        if (!req.body.tab_id_publi || Array.isArray(req.body.tab_id_publi))  {
            res.status(400).json("Requète mal formaté ajoutez id_publi");
        }
        req.body.tab_id_publi.map(id =>{
            if (typeof id != 'number') {
                err = true;
            }
        });
        if (err) {
            res.status(400).json("Requète mal formaté ajoutez tab_id_publi not number");
            return;
        }
        // requette bien formater
        let tab_comments = []
        req.body.tab_id_publi.forEach(async (id_pub) =>{
            let allcomment = `SELECT commentaire.id, contenu, date_comment, users.name FROM commentaire 
            INNER JOIN users ON 
            commentaire.id_user = users.id 
            WHERE commentaire.id_publi =  ${id_pub}
            ORDER BY commentaire.date_comment DESC LIMIT  0, 2;`
            let [rows, fields] = await db.query(allcomment);
            tab_comments.push({rows, id_pub});
        });
        return res.status(200).json(tab_comments);
    } catch (error) {
        res.status(500).json(error);
    }
};

//créer un commentaire
exports.createMessage = async (req, res) => {
    try {
        let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        let createComment = `INSERT INTO commentaire (contenu, date_comment, id_user, id_publi) VALUES '${req.body.contenu}', 
        '${now}, '${req.body.decodedToken.id}', '${req.body.id_publi}';`;
        let [rows, fields] = await db.query(createComment);
        console.log("--> le message a été créee", rows);
        return res.status(200).json("--> le message a été créee", rows);
    } catch (error) {
        res.status(500).json(error);
    }
};

//effacer un commentaire
exports.deleteMessage = async (req, res) => {
    try {
        let deleteComment = `DELETE FROM commentaire 
        WHERE commentaire.id = '${req.params.id};`;
        let [rows, fields] = await db.query(deleteComment);
        return res.status(200).json("message supprimé");
    } catch (error) {
        res.status(500).json(error);
    }
};

//mettre à jour un commentaire
exports.updateMessage = async (req, res) => {
    try {
        let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        let updateComment= `UPDATE commentaire SET contenu = '${req.body.contenu}', date_comment = '${now}' 
        WHERE commentaire.id = '${req.params.id}' AND publication.id_user = '${req.body.decodedToken.id}';`;
        let [rows, fields] = await db.query(updateComment);
        console.log('rows: --> message modifié', rows)
        return res.status(200).json(rows, "message mis à jour");
    } catch (error) {
        res.status(500).json(error);
    }
};