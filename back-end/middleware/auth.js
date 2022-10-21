//importations
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

module.exports = (req, res, next) => {
    try {
      // console.log("je teste le req.headers.jwt", req.headers.authorization)
      let tokenAndBearer = req.headers.authorization;
      let token = tokenAndBearer.replace("Bearer ", "");
      console.log('--> le token seul token:', token)
      if (!token) {
        throw "Pas de jwt";
      }
      //on décode le token
      //decoded token est un objet dans lequel on peut recuperer l'id
      const decodedToken = jwt.verify(token, process.env.KEY);
      //on compare les deux ID des users
      if (!decodedToken) {
        res.status(401).json("Vous n'etes pas autorisé à vous connecté")
        throw "Mauvais jwt";
      }
      console.log('decodedToken', decodedToken)
      req.body.decodedToken = decodedToken;
      res.locals.decodedToken = decodedToken;
      req.auth= {
        id: decodedToken.id
      }
      next()
      return;
    } catch (error) {
        //ici on récupère et on gère les erreurs du try
        res.status(401).send(error);
    }
};