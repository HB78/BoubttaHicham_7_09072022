//connexion à la BDD
const db = require("../dataBase/db");

//selectionner un like
exports.getLikeOfPublication = async (req, res) => {
    try {
        let getLike = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getLike);
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//selectionner un dislike
exports.getDislikeOfPublication = async (req, res) => {
    try {
        let getDislike = `select count(*)
        AS dislikes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getDislike);
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//selectionner les publications sans like IL FAUT L4ENLEVER 
exports.getNoLikeOfPublication = async (req, res) => {
    try {
        let getNoLike = `select count(*)
        AS dislikes
        from reaction 
        WHERE reaction.love = 0 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getNoLike);
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.addLike = async (req, res) => {
    try {
        let selectLike = `SELECT love, id_publi, id_user FROM reaction 
        WHERE id_publi = '${req.body.id_publi}' AND id_user ='${req.body.decodedToken.id}';`;

        let createLike = `INSERT INTO reaction (love, id_publi, id_user) 
        VALUES (${req.body.love},${req.body.id_publ}, id_user = '${req.body.decodedToken.id}')`;

        let updateLike = `UPDATE reaction SET love= 1 WHERE reaction.id_publi ='${req.params.id}' 
        AND id_user = '${req.body.decodedToken.id}';`;

        let [row, field] = await db.query(selectLike);
        if(row.length == 0) {
            let [like, fieldLike] = await db.query(createLike);
            return res.status(200).json("il n'existe pas encore de like pour ce user")
        }
        let [likes, fieldLikes] = await db.query(updateLike);
        return res.status(200).json("l'utilisateur a liker")
    } catch (error) {
        return res.status(500).json(error);
    }
};

//ajouter un dislike with ID_UTILISATEUR
exports.removeLike = async (req, res) => {
    try {
        let selectLike = `SELECT love, id_publi, id_user FROM reaction 
        WHERE id_publi = '${req.body.id_publi}' AND id_user ='${req.body.decodedToken.id}';`;

        let createLike = `INSERT INTO reaction (love, id_publi, id_user) 
        VALUES (${req.body.love},${req.body.id_publ}, id_user = '${req.body.decodedToken.id}')`;

        let updateLike = `UPDATE reaction SET love= -1 WHERE reaction.id_publi ='${req.params.id}' 
        AND id_user = '${req.body.decodedToken.id}';`;

        let [row, field] = await db.query(selectLike);
        if(row.length == 0) {
            let [like, fieldLike] = await db.query(createLike);
            return res.status(200).json("il n'existe pas encore de dislike pour ce user")
        }
        let [likes, fieldLikes] = await db.query(updateLike);
        return res.status(200).json("l'utilisateur a disliker")
    } catch (error) {
        return res.status(500).json(error);
    }
};

//annuler un like ou un dislike
exports.cancelLike = async (req, res) => {
    try {
        let noLike = `UPDATE reaction SET love= 0 WHERE reaction.id_publi ='${req.params.id}'  
        id_user = '${req.body.decodedToken.id}';`;

        let [rows, fields] = await db.query(noLike);
        res.status(200).json("annulation de vos réaction à la publication", rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//NE PAS OUBLIER l'autre façon qui consiste à effacer une ligne
//(creuser l'idée car je n'ai pas bien compris)