//importations
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

module.exports = (req, res, next) => {
    try {
      let token = req.headers.jwt || req.body.jwt;
      if (!token) {
        throw "Pas de jwt";
      }
      //on décode le token
      const decodedToken = jwt.verify(token, process.env.KEY);
      //on compare les deux ID des users
      if (!decodedToken) {
        res.status(401).json("Vous n'etes pas autorisé à vous connecté")
        throw "Mauvais jwt";
      }
      req.body.decodedToken = decodedToken;
      res.locals.decodedToken = decodedToken;
      next()
      return;
    } catch (error) {
        //ici on récupère et on gère les erreurs du try
        res.status(401).send(error);
    }
};