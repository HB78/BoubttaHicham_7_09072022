import axios from 'axios';
import React, { useState } from 'react'
import "../CreationPosts/creationPosts.css"

export default function CreationPosts() {
  //mise en place des states pour stocker les données des input
  const [titleOfPost, setTitleOfPost] = useState("");
  const [descriptionPost, setDescriptionPost] = useState("");
  const [photoOfPost, setPhotoOfPost] = useState("");

  const title = (e) => {
    setTitleOfPost(e.target.value)
  }
  const description = (e) => {
    setDescriptionPost(e.target.value)
  }
  const photoInPost = (e) => {
    setPhotoOfPost(e.target.value)
  }
  const allPost = {
    title : titleOfPost,
    description: descriptionPost,
    photo: photoOfPost
  }
  console.log(allPost)
  async function sendPost(e) {
    try {
      e.preventDefault()
      const response = await axios.post("http://localhost:3000/publication", allPost)
      console.log("response du try", response.data.id)
      alert("Bravo la publication est envoyéé")
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  }

  return (
    <div class="sendPostContainer">
      <h3 class="sendPostTitle">Postez votre publication</h3>
      <form action="/upload" method="POST" enctype="multipart/form-data" onSubmit={sendPost} className= "formulairePublication">
        <div class="inputsTextAndArea">
          <input type="text" 
          required placeholder="le titre de votre publication" 
          value={titleOfPost}
          onChange={title}/>
          <textarea name="posts" 
          id="posts" cols="70" rows="13" 
          placeholder="décrivez votre publication..." 
          required
          value= {descriptionPost}
          onChange= {description}>
          </textarea>
        </div>
        <div class="inputsFileAndSubmit">
          <input type="file"  name='image'
          value= {photoOfPost}
          onChange= {photoInPost}/>
          <input type="submit" value="envoyer" />
        </div>
      </form>
    </div>
  )
}
