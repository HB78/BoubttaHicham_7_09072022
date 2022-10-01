import React, { useContext, useState, useEffect } from 'react'
import "./publication.css";
import Comentaires from "./Comentaires/Comentaires";
import AuthContext from '../../../auth/authContext';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import apiurl from "../../../api_url";
import profil from "../../../assets/profil.png"

//Ici c'est le componant qui va afficher la card
//C'est ce component qui va etre afficher dans le composant parent PublicationS
//Avec le useState display on met en place un toggle
//Si c'est true on affiche les messages sinon on ne les affiche pas
//A noter que la condition {dislayCom && <Comentaires />} on ne la pas mise dans la balise bouton
//A noter que <commenttaire /> est un composant d'une autre page qui sert a faire une requete get et avoir les messages
export default function Publication({ data }) {
  console.log('data:', data)
  const [dislayCom, setDislayCom] = useState(false)
  
  //une fonction pour avoir une image de profil dynamique
  //si il n'y a pas de photo de profil (cad === a null) on met une image par defaut
  //sinon on met la photo de la BDD
  //j'ai decidé d'appeler la fonction dans le src de l'image cad src=photos()
  const photos = () => {
    if(data.userPhoto === null) {
      return profil
    }
    return data.userPhoto
  }

  // const authCtx = useContext(AuthContext)

  // let navigate = useNavigate();

  // useEffect(() => {
  //   if(!authCtx.userIsLoggedIn){
  //     navigate("/login");
  //   }
  // }, [])

  async function getComment() {
    setDislayCom(!dislayCom);
  }

  return (
    <div className="card">
      <div>
        <div className="sub-menu">
          <div>
            <p><span className="sub-menu_span">0</span><i className="fa fa-heart" aria-hidden="true"></i></p>
            <p><span className="sub-menu_span">0</span><i className="fa far fa-heart-broken"></i></p>
          </div>
          <h2>{data.title}</h2>
          {/* <!-- MENU INTERNE DANS LA CARD --> */}
          <div className="right">
            <ul className="menu">
              <li className="title">
                <div className="title_icon">+</div>
                <ul className="sous-menu">
                  <li>update</li>
                  <li>delete</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <p>{data.contenu}</p>
        <div className="card_imagePosted"><img src={data.photoPost} alt="" /></div>
      </div>
      <div className="cards_autor">
        <div className="cards_autor_img">
          <img src={photos()}alt="" className="cards_autor_img_autor" />
          <p>{data.userName}</p>
        </div>
        <div className="cards_autor_identity">
          <p>posté le {data.date_publi}</p>
        </div>
      </div>
      <div className="bar"></div>
      {/* <div><ShowLike idPubli = {element.id}/></div> */}
      <button onClick={getComment}><p>Commentaires</p></button>
      <input type="text" className="inputMessage"/><button className="btn_sendMessage">{'>'}</button>
      {dislayCom && <Comentaires idPubli={data.id} datas={data}/>}
    </div>
  )
}