//connexion à la BDD
const db = require("../dataBase/db");

//selectionner un like
exports.getLikeOfPublication = async (req, res) => {
    try {
        let getLike = `select count(*)
        AS likes
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
        AS dislikes
        from reaction 
        WHERE reaction.love = -1 AND reaction.id_publi = '${req.params.id}'
        ORDER BY reaction.date_reaction DESC;`;

        let [rows, fields] = await db.query(getDislike);
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//selectionner les publications sans like
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

//ajouter un like
exports.addLike = async (req, res) => {
    try {
        let moreLike = `UPDATE reaction SET love= 1 WHERE reaction.id_publi ='${req.params.id}';`;

        let [rows, fields] = await db.query(moreLike);
        res.status(201).json("like ajouté à la publication", rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//ajouter un dislike
exports.removeLike = async (req, res) => {
    try {
        let lessLike = `UPDATE reaction SET love= -1 WHERE reaction.id_publi ='${req.params.id}';`;

        let [rows, fields] = await db.query(lessLike);
        res.status(201).json("dislike ajouté à la publication", rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//annuler un like ou un dislike
exports.cancelLike = async (req, res) => {
    try {
        let noLike = `UPDATE reaction SET love= 0 WHERE reaction.id_publi ='${req.params.id}';`;

        let [rows, fields] = await db.query(noLike);
        res.status(200).json("annulation de vos réaction à la publication", rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};