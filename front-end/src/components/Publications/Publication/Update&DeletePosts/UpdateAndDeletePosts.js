import axios from 'axios';
import React, { useState } from 'react';
import UpdatePosts from './UpdatePosts';
import './updatedeleteicon.css';
import apiUrl from "./../../../../api_url"

function UpdateAndDeletePosts({ allData, togglePosts, getPosts }) {
  console.log('getPosts:', getPosts)
  console.log('allData:', allData)
  // const [update, setUpdate] = useState(false)

  const [newPostDescription, setNewPostsDescription] = useState(allData.contenu);
  const [newTitleOfPost, setNewTitleOfPost] = useState(allData.title);
  const [newPhotoOfPost, setNewPhotoOfPost] = useState(allData.photoPost);

  const changeDescription = (e) => {
    setNewPostsDescription(e.target.value)
  }
  const changeTitle = (e) => {
    setNewTitleOfPost(e.target.value)
  }
  const changePhoto = (e) => {
    setNewPhotoOfPost(e.target.files[0])
  }

  // //avec cette fonction le menu update va apparaitre et disparaitre en cliquant sur
  // //le bouton mise à jour
  // const togglePosts = () => {
  //   setUpdate(!update);
  // }
  //les données updated envoyé dans form data avec une requete put 
  let formData = new FormData();
  formData.append("title", newTitleOfPost);
  formData.append("contenu", newPostDescription);
  formData.append("image", newPhotoOfPost);
  console.log('formDataUpdated:', formData)

  const updatePosts = async (e) => {
    console.log(allData.id)
    e.preventDefault();
    await axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `${apiUrl}/publication/${allData.id}`,
      data: formData
    })
    togglePosts();
    getPosts()
  }

  return (
    <div className="card">
      {/* <!-- MENU INTERNE DANS LA CARD --> */}
      <div className="sendPostContainer sendPostContainer--width">
        <div className="sendPostTitle">
          <h3>Mettez votre publication à jour</h3>
          <div className="right">
            <UpdatePosts togglePosts={togglePosts} />
          </div>
        </div>
        <form action="/upload" method="PUT" encType="multipart/form-data" onSubmit={updatePosts} className="formulairePublication">
          <div className="inputsTextAndArea">
            <input type="text"
              className='input_update_title_publication'
              required placeholder="le titre de votre publication"
              value={newTitleOfPost}
              onChange={changeTitle} />
            <textarea name="posts"
              id="posts" cols="70" rows="13"
              placeholder="décrivez votre publication..."
              required
              value={newPostDescription}
              onChange={changeDescription}>
            </textarea>
          </div>
          <div className="inputsFileAndSubmit">
            <input
              type="file"
              name='image'
              onChange={changePhoto} />
            <input type="submit" value="envoyer" title="validez vos changements"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateAndDeletePosts