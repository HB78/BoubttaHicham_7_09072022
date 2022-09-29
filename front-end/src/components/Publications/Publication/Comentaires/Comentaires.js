import "./comentaires.css";
import React, { useEffect, useState } from 'react';
// import apiurl from "~/src/api_url";
import apiurl from "../../../../api_url";
import axios from "axios";
import UpdateCom from "./UpdateCom"
import profil from "../../../../assets/profil.png"

//le useEffect lance le GET pour obtenir la data
function Comentaires({ idPubli, datas }) {
  console.log('imageProfil:--> from component commentaire', datas)
  console.log('idPubli:', idPubli)
  const [comments, setComments] = useState([])
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
  const photosInMessage = () => {
    if(datas.userPhoto === null) {
      return profil
    }
    return datas.userPhoto
  }
  function DisplayComs(props) {
    return comments.map((com, index) => {
      return (
          <div class="messages">
            <div class="cards_message">
            <div class="card_message_header">
                    <div>
                        <img src={photosInMessage()} alt="" class="cards_autor_img_autor"/>
                    </div>
                    <p>{com.name}</p>
                </div>
              <p>{com.contenu}</p>
            </div>
          </div>
      )
    });
  }

  return (
    <div>
      <DisplayComs />
      {/* <UpdateCom getComs= {comments}/> */}
    </div>
  )
}

export default Comentaires;