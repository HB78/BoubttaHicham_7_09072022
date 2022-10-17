import axios from 'axios';
import React, { useState } from 'react';
import DeletePosts from './DeletePosts';
import UpdatePosts from './UpdatePosts';
import './updatedeleteicon.css';

function UpdateAndDeletePosts({ allData, togglePosts }) {
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
    setNewPhotoOfPost(e.target.files)
  }

  // //avec cette fonction le menu update va apparaitre et disparaitre en cliquant sur
  // //le bouton mise à jour
  // const togglePosts = () => {
  //   setUpdate(!update);
  // }
//les données updated envoyé dans form data avec une requete put 
  let formDataUpdated = new FormData();
    formDataUpdated.append("title", newTitleOfPost);
    formDataUpdated.append("contenu", newPostDescription);
    formDataUpdated.append("image", newPhotoOfPost);

  const updatePosts = async (e) => {
    e.preventDefault();
    const updateOnePost = await axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'PUT',
      url: `http://localhost:3000/publication/${allData.id}`,
      data: formDataUpdated
    })
    // togglePosts();
  }

  const deletePosts = async (e) => {
    console.log("ask to delete");
    e.preventDefault();
    const deleteOnePosts = await axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'DELETE',
      url: `http://localhost:3000/publication/${allData.id}`
    })
    // alert("publication effacée avec succès")
  }

  return (
      <div className="card">
        {/* <!-- MENU INTERNE DANS LA CARD --> */}
        <div className="right">
          <UpdatePosts togglePosts={togglePosts} />
          <DeletePosts deletePosts={deletePosts} />
        </div>
        <div className="sendPostContainer">
          <h3 className="sendPostTitle">Mettez votre publication à jour</h3>
          <form action="/upload" method="PUT" enctype="multipart/form-data" onSubmit={updatePosts} className="formulairePublication">
            <div className="inputsTextAndArea">
              <input type="text"
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
              <input type="file" name='image'
                onChange={changePhoto} />
              <input type="submit" value="envoyer" />
            </div>
          </form>
        </div>
      </div>
  )
}

export default UpdateAndDeletePosts