//afficher les commentaires

//faut il faire les choses en deux parties ?
//on joint la table like et publication dans publicationCTRL.js ??
//on joint la table publication et message dans commentCTRL.js ??

exports.getCommentByPublication = async (req,res) => {
    try {
        //si le commentaire n'est lié à aucune publication
        //ou l'id de la publication n'est pas un nombre
        if (!req.body.id_publi || typeof req.body.id_publi !== 'number' )  {
            res.status(400).json("Requète mal formaté ajoutez id_publi");
        }
        //ici on gère la pagination, on veut qu'il nous affiche les 10 premiers commentaires
        //on ne peut pas lui dire de tous nous donner car il peut y avoir des miliers de commentaires
        let START = req.body.start || 0;
        let NB_COMMENT = 10;
        //on veut afficher tous les commentaires des publications
        let allcomment = `SELECT id, contenu, date_comment, users.name FROM commentaire 
        INNER JOIN users ON 
        commentaire.id_user = users.id 
        WHERE id_publi =  ${req.body.id_publi}
        ORDER BY commentaire.date_comment DESC LIMIT  '${START}', '${NB_COMMENT}';`
        let [rows, fields] = await db.query(allcomment);
        // console.log("--> les messages affiché", rows);
        return res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
};
//afficher un commentaire --> sa sert a quelque chose ???

//créer un commentaire
exports.createMessage = async (req, res) => {
    try {
        let createComment = `INSERT INTO commentaire (contenu, date_comment, id_user, id_publi) VALUES '${req.body.contenu}', 
        '${Date.now}, '${req.body.decodedToken.id}', '${req.body.id_publi}';`;
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
        let updateComment= `UPDATE users SET contenu = '${req.body.contenu}', date_comment = '${Date.now}' 
        WHERE commentaire.id = '${req.params.id}' AND publication.id_user = '${req.body.decodedToken.id}';`;
        let [rows, fields] = await db.query(updateComment);
        console.log('rows: --> message modifié', rows)
        return res.status(200).json(rows, "message mis à jour");
    } catch (error) {
        res.status(500).json(error);
    }
};

