import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TbHeart } from "react-icons/tb";
import AddLike from './AddLike';
// import apiurl from "../../../api_url";


export default function ShowLike({ idPubliLike }) {
  console.log('idPubli:--> from like', idPubliLike)
  const [like, setLike] = useState([])
  const [dislike, setDislike] = useState([])
  //on affiche les publications de la BDD
  useEffect(() => {
    getLike()
    getDislike()
  }, [])
  async function getDislike() {
    try {
      let res = await axios.get(`http://localhost:3000/publication/dislike/${idPubliLike}`);
      setDislike(res.data);
      console.log(dislike, 'le resultat du axios pour les likes from showlike')
    } catch (error) {
      console.log(error)
    }
  }
  async function getLike() {
    try {
      let res = await axios.get(`http://localhost:3000/publication/like/${idPubliLike}`);
      setLike(res.data);
      console.log(like, 'le resultat du axios pour les likes')
    } catch (error) {
      console.log(error)
    }
  }
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
    console.log("coucou from addlike")
}
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
  console.log("coucou from addlike")
}
  return (
    <>
     <p onClick={addLove}><span className="sub-menu_span">{like}</span><i className="fa fa-heart" aria-hidden="true"></i></p>
     <p onClick={removeLike}><span className="sub-menu_span">{dislike}</span><i className="fa far fa-heart-broken"></i></p>
    </>
  )
}

