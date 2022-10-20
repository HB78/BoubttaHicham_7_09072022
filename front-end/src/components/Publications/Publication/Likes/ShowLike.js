import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddLike from './AddLike';
// import apiurl from "../../../api_url";


export default function ShowLike({ idPubliLike }) {
  console.log('idPubli:--> from like', idPubliLike)
  const [like, setLike] = useState([])
  const [dislike, setDislike] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const [hasDisliked, setHasDisliked] = useState(false)

  /
  //on affiche les publications de la BDD
  useEffect(() => {
    getLike()
    getDislike()
    likeCanceller()
    getIfUserHasLiked()
    getIfUserHasDisliked()
  }, [])

  //une fonction pour checker si le user a liker
  async function getIfUserHasLiked() {
    try {
      const res = await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          method: 'GET',
          url: `http://localhost:3000/publication/like/${idPubliLike}/userLiked`,
      })
      setHasLiked(res.data.hasLiked);
    } catch (error) {
      console.log(error)
    }
  }

  //une fonction pour checker si le user a disliker
  async function getIfUserHasDisliked() {
    try {
      const res = await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          method: 'GET',
          url: `http://localhost:3000/publication/dislike/${idPubliLike}/userDisliked`,
      })
      setHasDisliked(res.data.hasDisliked);
    } catch (error) {
      console.log(error)
    }
  }

  //une fonction pour obtenir les dislikes
  async function getDislike() {
    try {
      let res = await axios.get(`http://localhost:3000/publication/dislike/${idPubliLike}`);
      setDislike(res.data);
      console.log(dislike, 'le resultat du axios pour les likes from showlike')
    } catch (error) {
      console.log(error)
    }
  }
  //une fonction pour afficher les likes
  async function getLike() {
    try {
      let res = await axios.get(`http://localhost:3000/publication/like/${idPubliLike}`);
      setLike(res.data);
      console.log(like, 'le resultat du axios pour les likes')
    } catch (error) {
      console.log(error)
    }
  }
  //une fonction pour ajouter un like
  const addLove = async (e) => {
    e.preventDefault();
    const addLoves = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        method: 'PUT',
        url: `http://localhost:3000/publication/like/${idPubliLike}`,
        data: {
        love: JSON.stringify(1),
        id_publi: idPubliLike
        }
    })
    setLike(addLoves.data.nbLikesPositifs);
    setDislike(addLoves.data.nbLikesNegatifs);
    getIfUserHasLiked()
    getIfUserHasDisliked()
    console.log("coucou from addlike")
}
//une fonction pour ajouter un dislike et retirer un like (vis verca)
const removeLike = async (e) => {
  e.preventDefault();
  const addDisloves = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `http://localhost:3000/publication/dislike/${idPubliLike}`,
      data: {
      love: JSON.stringify(-1),
      id_publi: idPubliLike
      }
  })
  setLike(addDisloves.data.nbLikesPositifs);
  setDislike(addDisloves.data.nbLikesNegatifs);
  getIfUserHasLiked()
  getIfUserHasDisliked()
}
//Une fonction pour annuler un l'ajout d'un like ou d'un dislike
const likeCanceller = async (e) => {
  e.preventDefault();
  const cancellerOfLike = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `http://localhost:3000/publication/cancel/${idPubliLike}`,
      data: {
      love: JSON.stringify(0),
      id: idPubliLike
      }
  })
  //le setlike et le setdislike permettent de recalculer le nombre de like et de dislike
  setLike(cancellerOfLike.data.nbLikesPositifs);
  setDislike(cancellerOfLike.data.nbLikesNegatifs);
  //le getIfUserHasLiked et le getIfUserHasDisliked permettent de revérifier si le user a liker ou pas
  //on relance la fonction pour savoir si on a le droit de liker ou de disliker
  getIfUserHasLiked()
  getIfUserHasDisliked()
}
  return (
    <>
     <p onClick={hasLiked ? likeCanceller : addLove}><span className="sub-menu_span">{like}</span><i className="fa fa-heart" aria-hidden="true"></i></p>
     <p onClick={hasDisliked ? likeCanceller : removeLike}><span className="sub-menu_span">{dislike}</span><i className="fa far fa-heart-broken"></i></p>
    </>
  )
}

