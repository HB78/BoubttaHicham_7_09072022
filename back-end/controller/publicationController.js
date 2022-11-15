//c'est la page principale qui va afficher toutes les publications
const db = require("../dataBase/db");

//TODO: afficher les publications avec leur like, message et contenu
var moment = require('moment'); // require

exports.getLastPublication = async (req, res, next) => {
    try {
        //ici on gère la pagination, on veut qu'il nous affiche les 10 premieres publications
        //on ne peut pas lui dire de tout nous donner car il peut y avoir des miliers de publications
        let START = req.body.start || 0;
        let NB_PUBLI = 15;
        //les publications sans commentaires vont elles s'afficher ?
        let query = `SELECT publication.id, publication.title, publication.contenu,
        publication.date_publi, publication.image_path AS photoPost, users.name AS userName, users.id AS userID, users.image_profil AS userPhoto
        FROM publication
        JOIN users on publication.id_user = users.id
        ORDER BY publication.date_publi DESC
        LIMIT 0, 10;`;
        
        let [publications, fields] = await db.query(query);
        return res.status(200).json(publications);
    
    } catch (error) {
        res.status(500).json(error);
    }
};

//Les publications d'un utilissateur
exports.getLastPublicationOfUser = async (req, res) => {
    try {
        const idParams = req.params.id
        // //je vais chercher les id des utilisateurs dont j'aurais besoin pour la suite
        // let queryID = `SELECT publication.id AS publiID, users.image_profil AS userPhoto, users.id AS userID
        // FROM publication
        // JOIN users on publication.id_user = users.id;`;

        let publicationsOfOneUser = `SELECT publication.id AS publiID, publication.title,  publication.contenu,
        publication.date_publi, publication.image_path AS photoPost, users.name AS userName, users.image_profil AS userPhoto, users.poste AS poste, users.description AS description,
        users.id AS userID
        from publication
        join users on publication.id_user = users.id
        WHERE users.id = ?
        ORDER BY publication.date_publi DESC
        LIMIT 0, 5;`

        // let [row, field] = await db.query(queryID)
        // if(rows.length > 0) {
        //     return res.status(200).json(row);
        // }
        let checkUserId = `SELECT users.id, users.name AS userName, users.image_profil AS userPhoto, users.poste AS poste, users.description AS description FROM users WHERE users.id = ?;`
        let [row, field] = await db.query(checkUserId, [idParams])
        if(!row.length > 0) {
            return res.status(404).json("Cette utilisateur n'existe pas");
        }

        //si le user existe et qu'il n'a pas encore publié
        let [rows, fields] = await db.query(publicationsOfOneUser, [idParams])
        console.log('rows:', rows)
        if(!rows.length > 0) {
            let [row, field] = await db.query(checkUserId, [idParams])
            return res.status(200).json(row);
        }
        return res.status(200).json(rows);

    } catch (error) {
        res.status(500).json(error);
    }
};

// Auth avec => req.body.decodedToken.id

//créer une publication
exports.createPublication = async (req, res, next) => {
    const idToken = res.locals.decodedToken.id
    let contenu = req.body.contenu
    let title = req.body.title
    console.log("start create pub")
    try {
        if (!req.body.contenu) {
            res.status(400).send("bad request : le titre et la photo ne sont obligatoires mais entrez au moins du contenu");
            return;
        }
        let imgUrl = null;
        if (req.file && req.file.filename) {
            imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        let createPost = `INSERT INTO publication (title, contenu, image_path, date_publi, id_user) 
        VALUES
        (?, ?, ?, ?, ?);`;
        //si la requète contient un fichier
        console.log('createPost ', createPost )
        let [rows, fields] = await db.query(createPost, [title, contenu, imgUrl, now, idToken]);

        return res.status(201).json("publication créee avec succès");

    } catch (error) {
        res.status(500).json(error);
    }  
};

//effacer une publication
/* DELETE http://localhost:3000/publication/5
*/
exports.deletePublication = async (req, res) => {
    console.log("req.body.decodedToken", req.body.decodedToken);
    console.log("req.param.id from delete publication", req.params.id)
    const idParams = req.params.id
    const idToken = req.body.decodedToken.id
    try {
        let deletePost = `DELETE FROM publication WHERE publication.id = ? AND publication.id_user = ?;`;
        let [rows, fields] = await db.query(deletePost, [idParams, idToken]);
        console.log('rowsSetheader:', rows.affectedRows)
        if(rows.affectedRows === 0) {
            return res.status(404).json("la publication n'existe pas ou plus")
        }
        return res.status(200).json("La publication a été effacée");
    } catch (error) {
        res.status(500).json(error);
        console.log('error:', error)
    }
};

//mettre à jour une publication
exports.updatePublication = async (req, res) => {
    try {
        console.log("start update publication", req.params.id)
        console.log("req.body from back", req.body)
        console.log("---> req.body.DECODEDTOKEN from back update Publication !", req.auth.id)
        /** Requete SQL dynamique générer en fonction de si l'utilisateur a voulu modifier l'image de sa Publication */
        let request = "";
        let requestPartImg = null;
        let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        if(req.file && req.file.filename) {
            requestPartImg = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            request = `UPDATE publication SET image_path = '${requestPartImg}', title ='${req.body.title}', 
                contenu = '${req.body.contenu}', date_publi = '${now}' 
                WHERE id = '${req.params.id}' AND publication.id_user= ${req.auth.id};`
        }else{
            request = `UPDATE publication SET title ='${req.body.title}', 
                contenu = '${req.body.contenu}', date_publi = '${now}' 
                WHERE id = '${req.params.id}'AND publication.id_user= ${req.auth.id};`
        }
        
        let [rows, fields] = await db.query(request);
        return res.status(200).json(rows);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//***************************************ADMIN********************************* */

//effacer une publication en tant que admin
exports.adminDeletePublication = async (req, res) => {
    const idParams = req.params.id
    try {
        let deletePost = `DELETE FROM publication WHERE publication.id = ?;`;
        let [rows, fields] = await db.query(deletePost, [idParams]);
        console.log('rowsSetheader:', rows.affectedRows)
        if(rows.affectedRows === 0) {
            return res.status(404).json("la publication n'existe pas ou plus")
        }
        return res.status(200).json("La publication a été effacée");
    } catch (error) {
        res.status(500).json(error);
    }
};

//mettre à jour une publication en tant que admin
// exports.adminUpdatePublication = async (req, res) => {
//     try {
//         /** Requete SQL dynamique générer en fonction de si l'utilisateur a voulu modifier l'image de sa Publication */
//         let request = "";
//         let requestPartImg = null;
//         let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
//         if(req.file && req.file.filename) {
//             requestPartImg = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//             request = `UPDATE publication SET image_path = '${requestPartImg}', title ='${req.body.title}', 
//                 contenu = '${req.body.contenu}', date_publi = '${now}' 
//                 WHERE id = '${req.params.id}';`
//         }else{
//             request = `UPDATE publication SET title ='${req.body.title}', 
//                 contenu = '${req.body.contenu}', date_publi = '${now}' 
//                 WHERE id = '${req.params.id}';`
//         }
        
//         let [rows, fields] = await db.query(request);
//         return res.status(200).json("la publication a été updaté");
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error);
//     }
// };
