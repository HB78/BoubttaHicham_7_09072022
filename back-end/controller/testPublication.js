//c'est la page principale qui va afficher toutes les publications
const db = require("../dataBase/db");
//afficher toutes les publications

//TODO: afficher les publications avec leur like, message et contenu

exports.getAllPublication = async (req, res, next) => {
    try {
        //les publications sans commentaires vont elles s'afficher ?
        let query = `SELECT DISTINCT publication.id, publication.title, publication.date_publi, users.name AS userName, 
            (
                select count(*) 
                from reaction 
                WHERE reaction.love = 1 
                and reaction.id_publi = publication.id
            ) as alike,
            (
                select count(*) 
                from reaction 
                WHERE reaction.love = -1
                and reaction.id_publi = publication.id
            ) as dislike
        from publication
        left join reaction on reaction.id_publi = publication.id
        left join users on reaction.id_publi = users.id;`;
        let [publications, fields] = await db.query(query);
        // console.log("--> dans le rows il y a tt les publications", rows)

        console.log(publications[4])

        for (let i = 0 ; i < publications.length ; i++) {
            const publi = publications[i]
            const publi_id = publi.id
            const requete = `select commentaire.id, contenu, date_comment, users.name from commentaire join users on users.id = commentaire.id_user where id_publi = ` + publi_id 
            let [res_commentaires, fields] = await db.query(requete);
   
            publications[i].commentaires = res_commentaires
        }
        console.log(publications[4])
        return res.status(200).json("toutes les publications sont affichées");
    } catch (error) {
        res.status(500).json(error);
    }
};

//créer une publication
exports.createPublication = async (req, res, next) => {
    try {
        let createPostWithImage = `INSERT INTO publication (title, contenu, image_path, date_publi, id_user) VALUES 
        '${req.body.title}', '${req.body.contenu}', '${req.protocol}://${req.get('host')}/images/${req.file.filename}', 
        '${req.body.date_publi}, '${req.params.id}';`;

        let createPostWithNoImage = `INSERT INTO publication (title, contenu, date_publi) VALUES 
        '${req.body.title}', '${req.body.contenu}','${req.body.date_publi}';`;

        //si la requète contient un fichier
        if(req.file) {
            let [rows, fields] = await db.query(createPostWithImage);
            console.log("--> une image a ete ajouté dans la publication", rows)
            return res.status(201).json("publication créee avec ajout d'une image");
        } else {
            let [rows, fields] = await db.query(createPostWithNoImage);
            console.log("--> publication ajoutée sans image", rows)
            return res.status(201).json("publication créee sans ajout d'image");
        }

    } catch (error) {
        res.status(500).json(error);
    }  
};

//effacer une publication
exports.deletePublication = async (req, res) => {
    try {
        let deletePost = `DELETE FROM publication WHERE publication.id = '${req.params.publication.id}';`;
        let [rows, fields] = await db.query(deletePost);
        console.log("--> test delete publication", rows)
        return res.status(200).json("la publication a été effacée");
    } catch (error) {
        res.status(500).json(error);
    }
};

//mettre à jour une publication
exports.updatePublication = async (req, res) => {
    try {
        //si la req contient une image on efface d'abord celle stocker dans la BDD
        if(req.file) {
            let updatePost = `UPDATE publication SET image_path = '${req.protocol}://${req.get('host')}/images/${req.file.filename}',
            title ='${req.body.title}', contenu = '${req.body.contenu}', date_publi = '${req.body.date_publi}'  WHERE id = '${req.params.id}';`;

            let [rows, fields] = await db.query(updatePost);
            console.log("--> update publi with photo", rows)
        }else {
            let updatePostNoImage = `UPDATE publication SET title ='${req.body.title}', contenu = '${req.body.contenu}', 
            date_publi = '${req.body.date_publi}'  WHERE id = '${req.params.id}';`;
            let [rows, fields] = await db.query(updatePostNoImage);
            console.log("--> update publi with NO photo", rows)
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
//doit on faire une route pour afficher les post individuellement ??