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
        LIMIT 0, 5;`;
        
        let [publications, fields] = await db.query(query);
        return res.status(200).json(publications);
    
    } catch (error) {
        res.status(500).json(error);
    }
};

//Les publications d'un utilissateur
exports.getLastPublicationOfUser = async (req, res) => {
    try {
        // //je vais chercher les id des utilisateurs dont j'aurais besoin pour la suite
        // let queryID = `SELECT publication.id AS publiID, users.image_profil AS userPhoto, users.id AS userID
        // FROM publication
        // JOIN users on publication.id_user = users.id;`;

        let publicationsOfOneUser = `SELECT publication.id AS publiID, publication.title,  publication.contenu,
        publication.date_publi, publication.image_path AS photoPost, users.name AS userName, users.image_profil AS userPhoto, users.poste AS poste, users.description AS description,
        users.id AS userID
        from publication
        join users on publication.id_user = users.id
        WHERE users.id = '${req.params.id}'
        ORDER BY publication.date_publi DESC
        LIMIT 0, 5;`

        // let [row, field] = await db.query(queryID)
        // if(rows.length > 0) {
        //     return res.status(200).json(row);
        // }

        let [rows, fields] = await db.query(publicationsOfOneUser)
        if(!rows.length > 0) {
            return res.status(404).json("l'utilisateur n'a encore rien publié");
        }
        return res.status(200).json(rows);

    } catch (error) {
        res.status(500).json(error);
    }
};

// Auth avec => req.body.decodedToken.id

//créer une publication
exports.createPublication = async (req, res, next) => {
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
        ('${req.body.title}', '${req.body.contenu}', '${imgUrl}',
        '${now}', '${res.locals.decodedToken.id}');`;
        //si la requète contient un fichier
        console.log('createPost ', createPost )
        let [rows, fields] = await db.query(createPost);

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
    try {
        let deletePost = `DELETE FROM publication WHERE publication.id = '${req.params.id}' AND publication.id_user = '${req.body.decodedToken.id}';`;
        let [rows, fields] = await db.query(deletePost);
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
                WHERE id = '${req.params.id}';`
        }
        
        let [rows, fields] = await db.query(request);
        return res.status(200).json("la publication a été updaté");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//***************************************ADMIN********************************* */

//mettre à jour une publication en tant que admin
exports.adminUpdatePublication = async (req, res) => {
    try {
        /** Requete SQL dynamique générer en fonction de si l'utilisateur a voulu modifier l'image de sa Publication */
        let request = "";
        let requestPartImg = null;
        let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        if(req.file && req.file.filename) {
            requestPartImg = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            request = `UPDATE publication SET image_path = '${requestPartImg}', title ='${req.body.title}', 
                contenu = '${req.body.contenu}', date_publi = '${now}' 
                WHERE id = '${req.params.id}';`
        }else{
            request = `UPDATE publication SET title ='${req.body.title}', 
                contenu = '${req.body.contenu}', date_publi = '${now}' 
                WHERE id = '${req.params.id}';`
        }
        
        let [rows, fields] = await db.query(request);
        return res.status(200).json("la publication a été updaté");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

exports.adminDeletePublication = async (req, res) => {
    try {
        let deletePost = `DELETE FROM publication WHERE publication.id = '${req.params.id}';`;
        let [rows, fields] = await db.query(deletePost);
        console.log('rowsSetheader:', rows.affectedRows)
        if(rows.affectedRows === 0) {
            return res.status(404).json("la publication n'existe pas ou plus")
        }
        return res.status(200).json("La publication a été effacée");
    } catch (error) {
        res.status(500).json(error);
    }
};