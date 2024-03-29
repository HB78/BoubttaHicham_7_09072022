import React, { useContext, useState } from 'react'
import "./publication.css";
import "./responsive/responsivePublication.css";
import Comentaires from "./Comentaires/Comentaires";
import AuthContext from '../../../auth/authContext';
import { Link } from 'react-router-dom'
import axios from "axios";
import profil from "../../../assets/profil.png"
import CreationComs from './Comentaires/creationComs/CreationComs';
import ShowLike from './Likes/ShowLike';
import UpdatePosts from './Update&DeletePosts/UpdatePosts';
import DeletePosts from './Update&DeletePosts/DeletePosts';
import UpdateAndDeletePosts from './Update&DeletePosts/UpdateAndDeletePosts';
import apiUrl from "./../../../api_url";

//Ici c'est le componant qui va afficher la card
//C'est ce component qui va etre afficher dans le composant parent PublicationS
//Avec le useState display on met en place un toggle
//Si c'est true on affiche les messages sinon on ne les affiche pas
//A noter que la condition {dislayCom && <Comentaires />} on ne la pas mise dans la balise bouton
//A noter que <commenttaire /> est un composant d'une autre page qui sert a faire une requete get et avoir les messages
export default function Publication({ data, getPosts }) {
  console.log('data:---> from publication.js', data)
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

  const authCtx = useContext(AuthContext)
  const isAdmin = authCtx.isAdmin  
  console.log('isAdmin:FROM PUBLICATION', isAdmin)
  console.log(authCtx.isLoggedIn, "TEST login authx")

  const deletePosts = async (e) => {
    e.preventDefault();
    await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'DELETE',
      url: `${apiUrl}/publication/${data.id}`,
      // data: JSON.stringify(localStorage.getItem("userId"))
    })
    alert("publication effacée avec succès")
    getPosts()
  }

  async function getComment() {
    setDislayCom(!dislayCom);
  }
  function DisplayPublication() {
    return (
      <article className="card">
        <div>
          <div className="sub-menu">
            <div className='like_dislike'>
              <ShowLike idPubliLike={data.id} />
            </div>
            <h2 className='h2_publication'>{data.title}</h2>
            {/* <!-- MENU INTERNE DANS LA CARD --> */}
            {(data.userID === parseInt(localStorage.getItem("userId")) || isAdmin === 1) ?  
            <div className="right">
              <UpdatePosts togglePosts={togglePosts} getPosts={getPosts}/>
              <DeletePosts deletePosts={deletePosts} data={data} getPosts={getPosts}/>
            </div> : <div className='title_publication'></div>}
          </div>
          <p className='publication_description'>{data.contenu}</p>
          <div className="card_imagePosted"><img src={data.photoPost} alt="" /></div>
        </div>
        <div className="cards_autor">
          <div className="cards_autor_img_name">
            <div className="cards_autor_img"><img src={photos()} alt="" className="cards_autor_img_autor" /></div>
            <p><Link to={`/profil/${data.userID}`}>{data.userName}</Link></p>
          </div>
          <div className="cards_autor_identity">
            <p>posté le {data.date_publi}</p>
          </div>
        </div>
        <div className="bar"></div>
        <button onClick={getComment} className="show_comment" title="voir les commentaires"><p>Commentaires</p></button>
        <CreationComs idPublication={data.id} getPosts={getPosts} />
        {dislayCom && <Comentaires idPubli={data.id} datas={data} getPosts={getPosts} />}
      </article>
    )
  }
  return (
    update ? <UpdateAndDeletePosts allData={data} togglePosts={togglePosts} getPosts={getPosts}/> : <DisplayPublication />
  )
}