//connexion à la BDD
const db = require("../dataBase/db");

//selectionner un like
exports.getLikeOfPublication = async (req, res) => {
    const idParams = req.params.id
    try {
        let getLike = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getLike, [idParams]);
        res.status(200).json(rows[0].likes);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//selectionner un dislike
exports.getDislikeOfPublication = async (req, res) => {
    const idParams = req.params.id
    try {
        let getDislike = `select count(*)
        AS dislikes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getDislike, [idParams]);
        res.status(200).json(rows[0].dislikes);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//selectionner les publications sans like IL FAUT L4ENLEVER 
exports.getNoLikeOfPublication = async (req, res) => {
    const idParams = req.params.id
    try {
        let getNoLike = `select count(*)
        AS dislikes
        from reaction 
        WHERE reaction.love = 0 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getNoLike, [idParams]);
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.addLike = async (req, res) => {
    const idParams = req.params.id
    let idPubli = req.body.id_publi
    const idToken = req.auth.id
    let love = req.body.love
    try {
        let selectLike = `SELECT love, id_publi, id_user FROM reaction 
        WHERE id_publi = ? AND id_user = ?;`;

        let createLike = `INSERT INTO reaction (love, id_publi, id_user) 
        VALUES (?, ?, ?)`;

        let updateLike = `UPDATE reaction SET love= 1 WHERE reaction.id_publi = ? 
        AND id_user = ?;`;

        let [row, field] = await db.query(selectLike, [idPubli, idToken]);
        if(row.length == 0) { // dans le cas où il n'y a pas encore de like de l'utilisateur
            let [like, fieldLike] = await db.query(createLike, [love, idPubli, idToken]);
        }
        else {
            let [likes, fieldLikes] = await db.query(updateLike, [idParams, idToken]);
        }

        let getLikePositifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;
        let getLikeNegatifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;

        let [nbLikesPositifsRows, fieldsLikesPositifs] = await db.query(getLikePositifs, [idParams]);
        let [nbLikesNegatifsRows, fieldsLikesNegatifs] = await db.query(getLikeNegatifs, [idParams]);
        return res.status(200).json({
            nbLikesPositifs: nbLikesPositifsRows[0].likes,
            nbLikesNegatifs: nbLikesNegatifsRows[0].likes,
        })
    } catch (error) {
        console.log("erreur");
        console.log(error);
        return res.status(500).json(error);
    }
};

//ajouter un dislike with ID_UTILISATEUR
exports.removeLike = async (req, res) => {
    const idParams = req.params.id
    let idPubli = req.body.id_publi
    const idToken = req.auth.id
    let love = req.body.love
    try {
        let selectLike = `SELECT love, id_publi, id_user FROM reaction 
        WHERE id_publi = ? AND id_user = ?;`;

        let createLike = `INSERT INTO reaction (love, id_publi, id_user) 
        VALUES (?, ?, ?)`;

        let updateLike = `UPDATE reaction SET love= -1 WHERE reaction.id_publi = ?
        AND id_user = ?;`;

        let [row, field] = await db.query(selectLike, [idPubli, idToken]);
        if(row.length == 0) {
            let [like, fieldLike] = await db.query(createLike, [love, idPubli, idToken]);
        } else {
            let [likes, fieldLikes] = await db.query(updateLike, [idParams, idToken]);
        }
        let getLikePositifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;
        let getLikeNegatifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;
        let [nbLikesPositifsRows, fieldsLikesPositifs] = await db.query(getLikePositifs, [idParams]);
        let [nbLikesNegatifsRows, fieldsLikesNegatifs] = await db.query(getLikeNegatifs, [idParams]);
        
        return res.status(200).json({
            nbLikesPositifs: nbLikesPositifsRows[0].likes,
            nbLikesNegatifs: nbLikesNegatifsRows[0].likes,
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};

//annuler un like ou un dislike
exports.cancelLike = async (req, res) => {
    const idParams = req.params.id
    const idToken = req.auth.id
    try {
        //On enleve 1 ou -1 et on remplace par 0 pour annuler le like ou le dislike
        let noLike = `UPDATE reaction SET love= 0 WHERE reaction.id_publi = ? AND
        id_user = ? ;`;

        //on recalcule le nombre de like ou de dislike
        let [rows, fields] = await db.query(noLike, [idParams, idToken]);
        let getLikePositifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;
        let getLikeNegatifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = ?
        ORDER BY reaction.date_reaction DESC;`;
        let [nbLikesPositifsRows, fieldsLikesPositifs] = await db.query(getLikePositifs, [idParams]);
        let [nbLikesNegatifsRows, fieldsLikesNegatifs] = await db.query(getLikeNegatifs, [idParams]);
        
        //on return le nombre de like et de dislike mis à jour
        return res.status(200).json({
            nbLikesPositifs: nbLikesPositifsRows[0].likes,
            nbLikesNegatifs: nbLikesNegatifsRows[0].likes,
        })
        
    } catch (error) {
        return res.status(500).json(error);
    }
};
//NE PAS OUBLIER l'autre façon qui consiste à effacer une ligne
//(creuser l'idée car je n'ai pas bien compris)

// savoir si un utilisateur a liké une publication
exports.hasUserLikedPublication = async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.auth.id;
    try {
        let getLike = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = ? AND reaction.id_user = ? 
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getLike, [publicationId, userId]);
        //le res.status renvoie un booleen : si c'est > 0 renvoi true sinon sa renvoi false
        res.status(200).json({"hasLiked" : (rows[0].likes > 0)});
    } catch (error) {
        return res.status(500).json(error);
    }
};

// savoir si un utilisateur a disliké une publication
exports.hasUserDislikedPublication = async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.auth.id;
    try {
        let getLike = `select count(*)
        AS dislikes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = ? AND reaction.id_user = ? 
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getLike, [publicationId, userId]);
        //le res.status renvoie un booleen : si c'est > 0 renvoi true sinon sa renvoi false
        res.status(200).json({"hasDisliked" : (rows[0].dislikes > 0)}); 
    } catch (error) {
        return res.status(500).json(error);
    }
};