//recuperer la ressource
//faire une requete sql pour recuperer la publication qui correspond à l'id
//mettre la verification dans le right c'est lui qui verifie

//importations
module.exports = (req, res, next) => {
  try {
    if (!req.body.decodedToken || (req.body.decodedToken && !req.body.decodedToken.admin)) {
      throw "Cette route est réservée aux utilisateurs administrateurs."
    }
    next()
    return;
  } catch (error) {
      //ici on récupère et on gère les erreurs du try
      console.log('error', error)
      res.status(401).json({error});
  }
};