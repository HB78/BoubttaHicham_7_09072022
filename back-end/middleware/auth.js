//importations
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

module.exports = (req, res, next) => {
  //FIXME: le token n'apparait pas dans le req.headers.authorizaton
    try {
        const BearerAndToken = req.headers.authorization;
        console.log('req.headers.authorization:', req.headers.authorization)
        console.log(req.headers)
        console.log('--> BearerAndToken:', BearerAndToken)

        const token = BearerAndToken.replace("Bearer ", "");
        console.log('--> token:', token)

        //on décode le token
        const decodedToken = jwt.verify(token, process.env.KEY);

        //on compare les deux ID des users
        if (!decodedToken) {
          res.status(401).json("Vous n'etes pas autorisé à vous connecté")
          throw "Mauvais jwt";
        } else {
          // //on récupère l'userId dans le token
          // req.body.userIdDecodedToken = decodedToken.email;
          next()
          return
        }
    } catch (error) {
        //ici on récupère et on gère les erreurs du try
        res.status(401).json('Requete invalide!!');
    }
};