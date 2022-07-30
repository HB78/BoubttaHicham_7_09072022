//c'est la page principale qui va afficher toutes les publications
const db = require("../dataBase/db");
//afficher toutes les publications

//TODO: afficher les publications avec leur like, message et contenu

exports.getLastPublication = async (req, res, next) => {
    try {
        //ici on gère la pagination, on veut qu'il nous affiche les 10 premieres publications
        //on ne peut pas lui dire de tout nous donner car il peut y avoir des miliers de publications
        let START = req.body.start || 0;
        let NB_PUBLI = 10;
        //les publications sans commentaires vont elles s'afficher ?
        let query = `SELECT publication.id, publication.title, 
        publication.date_publi, users.name AS userName 
        FROM publication
        JOIN users on publication.id_user = users.id
        ORDER BY publication.date_publi DESC
        LIMIT '${START}', '${NB_PUBLI};`;

        let [publications, fields] = await db.query(query);
        return res.status(200).json(publications);

        // console.log(publications[4])

        // for (let i = 0 ; i < publications.length ; i++) {
        //     const publi = publications[i]
        //     const publi_id = publi.id
        //     const requete = `select commentaire.id, contenu, date_comment, users.name from commentaire join users on users.id = commentaire.id_user where id_publi = ` + publi_id 
        //     let [res_commentaires, fields] = await db.query(requete);
   
        //     publications[i].commentaires = res_commentaires
        // }
        // console.log(publications[4])
        // return res.status(200).json("toutes les publications sont affichées");

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getLastPublicationOfUser = async (req, res) => {
    try {
        let publicationsOfOneUser = `SELECT publication.id, publication.title, 
        publication.date_publi, users.name AS userName 
        from publication
        join users on publication.id_user = users.id
        WHERE users.id = '${req.body.decodedToken.id}'
        ORDER BY publication.date_publi DESC;`

        let [rows, fields] = await db.query(publicationsOfOneUser)
        if(!rows.length > 0) {
            return res.status(404).json("l'utilisateur n'a encore rien publié");
        }
        return res.status(200).json(rows);

    } catch (error) {
        res.status(500).json(error);
    }
}
// Auth avec => req.body.decodedToken.id

//créer une publication
exports.createPublication = async (req, res, next) => {
    try {
        let imgUrl = null;
        if (req.file && req.file.filename) {
            imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        let createPost = `INSERT INTO publication (title, contenu, image_path, date_publi, id_user) VALUES 
        '${req.body.title}', '${req.body.contenu}', '${imgUrl}', 
        '${Date.now()}, '${req.body.decodedToken.id}';`;

        //si la requète contient un fichier
        let [rows, fields] = await db.query(createPost);

        return res.status(201).json("publication créee sans ajout d'image");

    } catch (error) {
        res.status(500).json(error);
    }  
};

//effacer une publication
/* DELETE http://localhost:3000/publication/5
*/
exports.deletePublication = async (req, res) => {
    console.log("req.body.decodedToken", req.body.decodedToken);
    try {
        let deletePost = `DELETE FROM publication WHERE publication.id = '${req.params.id}';`;
        let [rows, fields] = await db.query(deletePost);
        console.log("--> test delete publication", rows)
        return res.status(200).json({rows: rows, info: "la publication a été effacée"});
    } catch (error) {
        res.status(500).json(error);
    }
};

//mettre à jour une publication
exports.updatePublication = async (req, res) => {
    try {
        /** Requete SQL dynamique générer en fonction de si l'utilisateur a voulu modifier l'image de sa Publication */
        let requestPartImg = null;
        if(req.file && req.file.filename) {
            requestPartImg = `image_path = '${req.protocol}://${req.get('host')}/images/${req.file.filename}',`
        }
        let request = `UPDATE publication SET ${requestPartImg} title ='${req.body.title}', 
        contenu = '${req.body.contenu}', date_publi = '${Date.now()}' 
        WHERE id = '${req.params.id}' AND publication.id_user = '${req.body.decodedToken.id}';`
        let [rows, fields] = await db.query(request);
        return res.status(200).json({rows: rows, info: "la publication a été update"});
    } catch (error) {
        res.status(500).json(error);
    }
};
//doit on faire une route pour afficher les post individuellement ??