import React, { useContext, useState, useEffect } from 'react'
import "./publication.css";
import Comentaires from "./Comentaires/Comentaires";
import AuthContext from '../../../auth/authContext';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import profil from "../../../assets/profil.png"
import CreationComs from './Comentaires/creationComs/CreationComs';
import ShowLike from './Likes/ShowLike';
import UpdatePosts from './Update&DeletePosts/UpdatePosts';
import DeletePosts from './Update&DeletePosts/DeletePosts';
import UpdateAndDeletePosts from './Update&DeletePosts/UpdateAndDeletePosts';

//Ici c'est le componant qui va afficher la card
//C'est ce component qui va etre afficher dans le composant parent PublicationS
//Avec le useState display on met en place un toggle
//Si c'est true on affiche les messages sinon on ne les affiche pas
//A noter que la condition {dislayCom && <Comentaires />} on ne la pas mise dans la balise bouton
//A noter que <commenttaire /> est un composant d'une autre page qui sert a faire une requete get et avoir les messages
export default function Publication({ data, getPosts }) {
  console.log('data:', data)
  const [dislayCom, setDislayCom] = useState(false)
  const [update, setUpdate] = useState(false)

  //une fonction pour avoir une image de profil dynamique
  //si il n'y a pas de photo de profil (cad === a null) on met une image par defaut
  //sinon on met la photo de la BDD
  //j'ai decidé d'appeler la fonction dans le src de l'image cad src=photos()
  const photos = () => {
    if (data.userPhoto === null) {
      return profil
    }
    return data.userPhoto
  }
  //avec cette fonction le menu update va apparaitre et disparaitre en cliquant sur
  //le bouton mise à jour
  const togglePosts = () => {
    setUpdate(!update);
  }

  // const authCtx = useContext(AuthContext)

  // let navigate = useNavigate();

  // useEffect(() => {
  //   if(!authCtx.userIsLoggedIn){
  //     navigate("/login");
  //   }
  // }, [])

  const deletePosts = async (e) => {
    console.log("ask to delete");
    e.preventDefault();
    const deleteOnePosts = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'DELETE',
      url: `http://localhost:3000/publication/${data.id}`,
      // data: JSON.stringify(localStorage.getItem("userId"))
    })
    alert("publication effacée avec succès")
  }
  async function getComment() {
    setDislayCom(!dislayCom);
  }
  function DisplayPublication() {
    return (
      <div className="card">
        <div>
          <div className="sub-menu">
            <div>
              <ShowLike idPubliLike={data.id} />
            </div>
            <h2>{data.title}</h2>
            {/* <!-- MENU INTERNE DANS LA CARD --> */}
            <div className="right">
              <UpdatePosts togglePosts={togglePosts}/>
              <DeletePosts deletePosts={deletePosts}/>
            </div>
          </div>
          <p>{data.contenu}</p>
          <div className="card_imagePosted"><img src={data.photoPost} alt="" /></div>
        </div>
        <div className="cards_autor">
          <div className="cards_autor_img">
            <img src={photos()} alt="" className="cards_autor_img_autor" />
            <p>{data.userName}</p>
          </div>
          <div className="cards_autor_identity">
            <p>posté le {data.date_publi}</p>
          </div>
        </div>
        <div className="bar"></div>
        <button onClick={getComment}><p>Commentaires</p></button>
        <CreationComs idPublication={data.id} getPosts={getPosts} />
        {dislayCom && <Comentaires idPubli={data.id} datas={data} getPosts={getPosts} />}
      </div>
    )
  }
  return (
    update ? <UpdateAndDeletePosts allData={data} togglePosts={togglePosts}/> : <DisplayPublication />
  )
}