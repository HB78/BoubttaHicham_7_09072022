import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Comentaires from '../../Publications/Publication/Comentaires/Comentaires';
import CreationComs from '../../Publications/Publication/Comentaires/creationComs/CreationComs';
import ShowLike from '../../Publications/Publication/Likes/ShowLike'
import DeletePosts from '../../Publications/Publication/Update&DeletePosts/DeletePosts'
import UpdateAndDeletePosts from '../../Publications/Publication/Update&DeletePosts/UpdateAndDeletePosts';
import UpdatePosts from '../../Publications/Publication/Update&DeletePosts/UpdatePosts'
// import Profil from '../components/Profils/Profils';
import profilImage from "./../../../assets/profil.png"
import "./profilPost.css"

export default function ProfilPost({ data, getPosts }) {
  console.log('data profil:', data)
  const [update, setUpdate] = useState(false)
  const [dislayCom, setDislayCom] = useState(false)

  const togglePosts = () => {
    setUpdate(!update);
  }

  const photos = () => {
    if (data.userPhoto === null) {
      return profilImage
    }
    return data.userPhoto
  }
  async function getComment() {
    setDislayCom(!dislayCom);
  }
  const deletePosts = async (e) => {
    e.preventDefault();
    const deleteOnePosts = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'DELETE',
      url: `http://localhost:3000/publication/${data.publiID}`,
      // data: JSON.stringify(localStorage.getItem("userId"))
    })
    alert("publication effacée avec succès")
  }

  function DisplayPublicationProfil() {
    return (
      <div className="card_profil">
        <div>
          <div className="sub-menu_profil">
            <div>
              <ShowLike idPubliLike={data.publiID} />
            </div>
            <h2>{data.title}</h2>
            {/* <!-- MENU INTERNE DANS LA CARD --> */}
            <div className="right_profil">
              <UpdatePosts togglePosts={togglePosts} />
              <DeletePosts deletePosts={deletePosts} />
            </div>
          </div>
          <p className='publication_description_profil '>{data.contenu}</p>
          <div className="card_imagePosted_profil"><img src={data.photoPost} alt="" /></div>
        </div>
        <div className="cards_autor_profil">
          <div className="cards_autor_img_profil">
            <img src={photos()} alt="" className="cards_autor_img_autor_profil" />
            <p>{data.userName}</p>
          </div>
          <div className="cards_autor_identity">
            <p>posté le {data.date_publi}</p>
          </div>
        </div>
        <div className="bar_profil"></div>
        <button onClick={getComment} className="show_comment"><p>Commentaires</p></button>
        <CreationComs idPublication={data.publiID} getPosts={getPosts} />
        {dislayCom && <Comentaires idPubli={data.publiID} datas={data} getPosts={getPosts} />}
      </div>
    )
  }
  return (
    update ? <UpdateAndDeletePosts allData={data} togglePosts={togglePosts} /> :
   <DisplayPublicationProfil />
  )
}
