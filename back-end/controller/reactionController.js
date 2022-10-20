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
        res.status(200).json(rows[0].likes);
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
        res.status(200).json(rows[0].dislikes);
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
        VALUES (${req.body.love},${req.body.id_publi}, ${req.body.decodedToken.id})`;

        let updateLike = `UPDATE reaction SET love= 1 WHERE reaction.id_publi ='${req.params.id}' 
        AND id_user = '${req.body.decodedToken.id}';`;

        let [row, field] = await db.query(selectLike);
        if(row.length == 0) { // dans le cas où il n'y a pas encore de like de l'utilisateur
            let [like, fieldLike] = await db.query(createLike);
        }
        else {
            let [likes, fieldLikes] = await db.query(updateLike);
        }

        let getLikePositifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;
        let getLikeNegatifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;

        let [nbLikesPositifsRows, fieldsLikesPositifs] = await db.query(getLikePositifs);
        let [nbLikesNegatifsRows, fieldsLikesNegatifs] = await db.query(getLikeNegatifs);
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
    try {
        let selectLike = `SELECT love, id_publi, id_user FROM reaction 
        WHERE id_publi = '${req.body.id_publi}' AND id_user ='${req.body.decodedToken.id}';`;

        let createLike = `INSERT INTO reaction (love, id_publi, id_user) 
        VALUES (${req.body.love}, ${req.body.id_publi}, ${req.body.decodedToken.id})`;

        let updateLike = `UPDATE reaction SET love= -1 WHERE reaction.id_publi ='${req.params.id}' 
        AND id_user = '${req.body.decodedToken.id}';`;

        let [row, field] = await db.query(selectLike);
        if(row.length == 0) {
            let [like, fieldLike] = await db.query(createLike);
        } else {
            let [likes, fieldLikes] = await db.query(updateLike);
        }
        let getLikePositifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;
        let getLikeNegatifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;
        let [nbLikesPositifsRows, fieldsLikesPositifs] = await db.query(getLikePositifs);
        let [nbLikesNegatifsRows, fieldsLikesNegatifs] = await db.query(getLikeNegatifs);
        
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
    try {
        //On enleve 1 ou -1 et on remplace par 0 pour annuler le like ou le dislike
        let noLike = `UPDATE reaction SET love= 0 WHERE reaction.id_publi ='${req.params.id}' AND
        id_user = '${req.body.decodedToken.id}';`;

        //on recalcule le nombre de like ou de dislike
        let [rows, fields] = await db.query(noLike);
        let getLikePositifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;
        let getLikeNegatifs = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;
        let [nbLikesPositifsRows, fieldsLikesPositifs] = await db.query(getLikePositifs);
        let [nbLikesNegatifsRows, fieldsLikesNegatifs] = await db.query(getLikeNegatifs);
        
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
    const userId = req.body.decodedToken.id;
    try {
        let getLike = `select count(*)
        AS likes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = 1 AND reaction.id_publi = '${publicationId}' AND reaction.id_user = '${userId}' 
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getLike);
        //le res.status renvoie un booleen : si c'est > 0 renvoi true sinon sa renvoi false
        res.status(200).json({"hasLiked" : (rows[0].likes > 0)});
    } catch (error) {
        return res.status(500).json(error);
    }
};

// savoir si un utilisateur a disliké une publication
exports.hasUserDislikedPublication = async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.body.decodedToken.id;
    try {
        let getLike = `select count(*)
        AS dislikes, reaction.id_publi AS id_publi
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = '${publicationId}' AND reaction.id_user = '${userId}' 
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getLike);
        //le res.status renvoie un booleen : si c'est > 0 renvoi true sinon sa renvoi false
        res.status(200).json({"hasDisliked" : (rows[0].dislikes > 0)}); 
    } catch (error) {
        return res.status(500).json(error);
    }
};