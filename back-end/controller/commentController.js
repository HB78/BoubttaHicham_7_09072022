//afficher les commentaires

//faut il faire les choses en deux parties ?
//on joint la table like et publication dans publicationCTRL.js ??
//on joint la table publication et message dans commentCTRL.js ??

exports.getAllComment = async (req,res) => {
    try {
        //on veut afficher tous les commentaires des publications
        //il faut lier la table commentaire et publication
        //comment gérer les publications sans message ? outer join ?
        let allcomment = `SELECT contenu, date_comment, users.name FROM commentaire INNER JOIN users
        ON commentaire id_users = id.users;`;
        let [rows, fields] = await db.query(this.getAllComment);
        console.log("--> les messages affiché", rows);
        return res.status(200).json("message des publications affichés");
    } catch (error) {
        res.status(500).json(error);
    }
};
//afficher un commentaire --> sa sert a quelque chose ???

//créer un commentaire
exports.createMessage = async (req, res) => {
    try {
        let createComment = `INSERT INTO commentaire (contenu, date_comment) VALUES '${req.body.contenu}', 
        '${req.body.date_comment}' WHERE '${req.params.id}';`;
        let [rows, fields] = await db.query(createComment);
        console.log("--> le message a été créee", rows);
        return res.status(200).json("message posté avec succès");
    } catch (error) {
        res.status(500).json(error);
    }
};

//effacer un commentaire
exports.deleteMessage = async (req, res) => {
    try {
        let deleteComment = `DELETE contenu, date_comment FROM commentaire WHERE '${req.params.id}';`;
        let [rows, fields] = await db.query(deleteComment);
        return res.status(200).json("message supprimé");
    } catch (error) {
        res.status(500).json(error);
    }
};

//mettre à jour un commentaire
exports.updateMessage = async (req, res) => {
    try {
        let updateComment= `UPDATE users SET contenu = '${req.body.contenu}', date_comment = '${req.body.date_comment}' 
        WHERE id = '${req.params.id}';`;
        let [rows, fields] = await db.query(updateComment);
        console.log('rows: --> message modifié', rows)
        return res.status(200).json("message mis à jour");
    } catch (error) {
        res.status(500).json(error);
    }
};