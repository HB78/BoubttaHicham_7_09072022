import axios from 'axios';
import React, { useState } from 'react'
import "../CreationPosts/creationPosts.css"

export default function CreationPosts({getPosts}) {
  //mise en place des states pour stocker les données des input
  const [titleOfPost, setTitleOfPost] = useState("");
  const [descriptionPost, setDescriptionPost] = useState("");
  const [photoOfPost, setPhotoOfPost] = useState(null);

  const titles = (e) => {
    setTitleOfPost(e.target.value)
  }
  const description = (e) => {
    setDescriptionPost(e.target.value)
  }
  const photoInPost = (e) => {
    setPhotoOfPost(e.target.files[0])
  }
  
  

 async function sendPost(e) {
  try {
    e.preventDefault()
    console.log("entrée de la requete")

    let formData = new FormData();
    formData.append("title", titleOfPost);
    formData.append("contenu", descriptionPost);
    formData.append("image", photoOfPost);

    const sendOnePublication = await axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      method: 'POST',
      url:"http://localhost:3000/publication",
      data: formData
    })
    console.log("sortie de la requete")
    // console.log("response du try", sendOnePublication.data.id)
    getPosts();
    alert("Bravo la publication a éte envoyéé")
    
  } catch (error) {
    console.log(error, "ça ne marche pas")
    // alert(error.sendOnePublication.data.error)
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
          onChange={titles}/>
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
          onChange= {photoInPost}/>
          <input type="submit" value="envoyer" />
        </div>
      </form>
    </div>
  )
}
// async function sendPost(e) {
//   try {
//     e.preventDefault()
//     console.log("entrée de la requete")
//     const sendOnePublication = await axios({
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Authorization': 'Bearer ' + localStorage.getItem("token")
//       },
//       method: 'POST',
//       withCredentials: true,
//       url:"http://localhost:3000/publication",
//       data: {
//         title : titleOfPost,
//         contenu: descriptionPost
//         // imgUrl: photoOfPost
//       }
//     })
//     console.log("sortie de la requete")
//     // console.log("response du try", sendOnePublication.data.id)
//     alert("Bravo la publication a éte envoyéé")
//   } catch (error) {
//     console.log(error, "ça ne marche pas")
//     // alert(error.sendOnePublication.data.error)
//   }
// }

// fetch('http://localhost:3000/publication', {
//   method:'post',
//   headers: myHeaders,
//   body: JSON.stringify(allPost)
// })