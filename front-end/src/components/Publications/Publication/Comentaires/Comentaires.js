import "./comentaires.css";
import React, { useEffect, useState } from 'react';
// import apiurl from "~/src/api_url";
import apiurl from "../../../../api_url";
import axios from "axios";
import profil from "../../../../assets/profil.png"
//import DeleteCom from "./updateAnddeleteCom/DeleteCom";
import Commentaire from "./updateAnddeleteCom/Commentaire";

//le useEffect lance le GET pour obtenir la data
function Comentaires({ idPubli, datas, getPosts }) {
  console.log('imageProfil:--> from component commentaire', datas)
  console.log('idPubli:', idPubli)
  const [comments, setComments] = useState([])

  //cela lance la fonction GET pour obtenir la data
  useEffect(() => {
    console.log("apiurl", apiurl);
    getComs()
  }, [])

  //la fonction fait un GET avec un id dynamique pour obtenir les commentaires de chaque publication
  async function getComs() {
    if (comments.length <= 0) {
      try {
        let res = await axios.get(`${apiurl}/commentaires/message/${idPubli}`); // ajouter id depuis props
        console.log("commentaire res.data", res.data);
        setComments(res.data);
      } catch (error) {
        console.log(error)
      }
    }
  }
  //si il y a une photo de profil tu l'affiche sinon tu mets une photo de profil par defaut
  const photosInMessage = () => {
    if (datas.userPhoto === null) {
      return profil
    }
    return datas.userPhoto
  }
  function DisplayComs(props) {
    return comments.map((com, index) => {
      return (
        <Commentaire key={index} profil={profil} com={com} getPosts={getPosts} />
      )
    });
  }

  return (
    <div>
      <DisplayComs />
    </div>
  )
}

export default Comentaires;